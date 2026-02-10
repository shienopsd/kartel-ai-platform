"use client";

import { useState } from "react";
import { Product } from "@/types";

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadFile = async (product: Product) => {
    setIsDownloading(true);
    setError(null);

    try {
      // Check if user has already downloaded this file (prevent duplicate counts)
      const downloaded = localStorage.getItem(`downloaded_${product.id}`);

      // Track download (fire and forget - don't wait for response)
      if (!downloaded) {
        fetch("/api/downloads/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        }).catch((err) => console.error("Failed to track download:", err));

        // Mark as downloaded in localStorage
        localStorage.setItem(`downloaded_${product.id}`, "true");
      }

      // Trigger download via our proxy API route
      // This streams the file from GitHub Releases through our API
      const link = document.createElement("a");
      link.href = `/api/downloads/${product.id}`;
      link.download = product.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
      setIsDownloading(false);
      return false;
    }
  };

  return { downloadFile, isDownloading, error };
}
