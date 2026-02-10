"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  fileName: string | null;
  productTitle: string | null;
  error: string | null;
}

interface DownloadContextValue extends DownloadState {
  startDownload: (product: Product) => Promise<boolean>;
  cancelDownload: () => void;
  clearError: () => void;
}

const DownloadContext = createContext<DownloadContextValue | null>(null);

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    fileName: null,
    productTitle: null,
    error: null,
  });

  const startDownload = async (product: Product): Promise<boolean> => {
    // Prevent concurrent downloads
    if (state.isDownloading) {
      setState((prev) => ({
        ...prev,
        error: "A download is already in progress",
      }));
      return false;
    }

    setState({
      isDownloading: true,
      progress: 0,
      fileName: product.fileName,
      productTitle: product.title,
      error: null,
    });

    try {
      // Track download (fire and forget)
      const downloaded = localStorage.getItem(`downloaded_${product.id}`);
      if (!downloaded) {
        fetch("/api/downloads/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id }),
        }).catch(console.error);

        localStorage.setItem(`downloaded_${product.id}`, "true");
      }

      // Use XMLHttpRequest for progress tracking
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/api/downloads/${product.id}`, true);
        xhr.responseType = "blob";

        // Track progress
        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setState((prev) => ({ ...prev, progress: percentComplete }));
          }
        };

        // Handle completion
        xhr.onload = () => {
          if (xhr.status === 200) {
            const blob = xhr.response;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = product.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setState((prev) => ({ ...prev, progress: 100 }));

            // Auto-clear after 2 seconds
            setTimeout(() => {
              setState({
                isDownloading: false,
                progress: 0,
                fileName: null,
                productTitle: null,
                error: null,
              });
            }, 2000);

            resolve(true);
          } else {
            reject(new Error(`Download failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send();
      });
    } catch (err) {
      setState({
        isDownloading: false,
        progress: 0,
        fileName: null,
        productTitle: null,
        error: err instanceof Error ? err.message : "Download failed",
      });
      return false;
    }
  };

  const cancelDownload = () => {
    setState({
      isDownloading: false,
      progress: 0,
      fileName: null,
      productTitle: null,
      error: null,
    });
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <DownloadContext.Provider
      value={{ ...state, startDownload, cancelDownload, clearError }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloadContext() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error("useDownloadContext must be used within DownloadProvider");
  }
  return context;
}
