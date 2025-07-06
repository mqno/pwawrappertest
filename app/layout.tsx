import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Simple PWA - Image & Text Display",
  description: "A beautiful Progressive Web App that displays images with descriptive text. Fully accessible with keyboard navigation and screen reader support.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Simple PWA",
  },
  formatDetection: {
    telephone: false,
  },
  keywords: ["PWA", "Progressive Web App", "Next.js", "accessibility", "responsive design"],
  authors: [{ name: "PWA Developer" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1f2937',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div id="root" role="application" aria-label="Simple PWA Application">
          {children}
        </div>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
