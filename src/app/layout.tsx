import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import { DownloadProvider } from "@/contexts/DownloadContext";

const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
        className={`${wixMadeforText.variable} antialiased`}
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
