import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DownloadProvider } from "@/contexts/DownloadContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kartel AI - Workflows & Plugins",
  description:
    "Free workflows and plugins created by Kartel AI generative engineers. Download automation workflows, integrations, and plugins to enhance your AI toolkit.",
  keywords: "Kartel AI, workflows, plugins, automation, AI tools, integrations",
  openGraph: {
    title: "Kartel AI - Workflows & Plugins",
    description:
      "Free workflows and plugins created by Kartel AI generative engineers.",
    siteName: "Kartel AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: "var(--dark-bg)",
          color: "var(--foreground)",
          minHeight: "100vh",
        }}
      >
        <DownloadProvider>{children}</DownloadProvider>
      </body>
    </html>
  );
}
