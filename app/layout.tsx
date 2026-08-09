import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./v6.css";
import "./v7.css";

export const metadata: Metadata = {
  title: "OceanLearn — English adventures for Grades 1–5",
  description: "A playful, Maldivian-themed English learning adventure for primary students.",
  applicationName: "OceanLearn",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "OceanLearn" },
  icons: { icon: "/assets/app-icon-192.jpg", apple: "/assets/apple-touch-icon.jpg" },
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
      <body>{children}</body>
    </html>
  );
}
