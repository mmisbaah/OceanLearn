import "./atollingo-return.css";
import AppHubConnector from '../atollingo/components/AppHubConnector';
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./v6.css";
import "./v7.css";
import "./v8.css";

export const metadata: Metadata = {
  title: "OceanLearn — English adventures for Grades 1–5",
  description: "A playful, Maldivian-themed English learning adventure for primary students.",
  applicationName: "OceanLearn",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "OceanLearn" },
  icons: { icon: [{url:'/browser-icon-v2.png',type:'image/png'}], shortcut:'/browser-icon-v2.png', apple:'/browser-icon-v2.png' },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#19aeb7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><nav className="atollingo-return" aria-label="Learning hub"><a href="https://atollingo.com/"><span className="atollingo-return-icon" aria-hidden="true">🏝️</span><span>Back to Atollingo</span><span aria-hidden="true">↗</span></a></nav><AppHubConnector app="OceanLearn">{children}</AppHubConnector></body>
    </html>
  );
}

