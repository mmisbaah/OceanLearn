import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the OceanLearn production shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>OceanLearn — English adventures for Grades 1–5<\/title>/i);
  assert.match(html, /Swimming to OceanLearn/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships production metadata and removes starter preview files", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /OceanLearn/);
  assert.match(layout, /English learning adventure/);
  assert.match(page, /OceanLearnApp/);
  assert.doesNotMatch(page + layout + packageJson, /codex-preview|_sites-preview|react-loading-skeleton/i);
  const previewFiles = await readdir(new URL("../app/_sites-preview", import.meta.url)).catch(
    (error) => (error.code === "ENOENT" ? [] : Promise.reject(error)),
  );
  assert.deepEqual(previewFiles, []);
  await access(new URL("../public/manifest.webmanifest", import.meta.url));
  await access(new URL("../public/sw.js", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
});
