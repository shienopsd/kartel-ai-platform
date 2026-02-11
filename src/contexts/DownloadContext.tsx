"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Product } from "@/types";

const USER_EMAIL_KEY = "kartel_user_email";

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  fileName: string | null;
  productTitle: string | null;
  error: string | null;
  // Email modal state
  showEmailModal: boolean;
  pendingProduct: Product | null;
}

interface DownloadContextValue extends DownloadState {
  startDownload: (product: Product) => Promise<boolean>;
  cancelDownload: () => void;
  clearError: () => void;
  // Email modal functions
  handleEmailSubmit: (email: string) => Promise<void>;
  closeEmailModal: () => void;
}

const DownloadContext = createContext<DownloadContextValue | null>(null);

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    fileName: null,
    productTitle: null,
    error: null,
    showEmailModal: false,
    pendingProduct: null,
  });

  // Get saved email from localStorage
  const getUserEmail = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(USER_EMAIL_KEY);
  }, []);

  // Save email to localStorage
  const saveUserEmail = useCallback((email: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_EMAIL_KEY, email);
    }
  }, []);

  // Capture email via API
  const captureEmail = async (email: string, product: Product) => {
    try {
      await fetch("/api/users/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          productId: product.id,
          productTitle: product.title,
        }),
      });
    } catch (err) {
      console.error("Failed to capture email:", err);
    }
  };

  // Track download in analytics
  const trackDownload = async (product: Product) => {
    const downloaded = localStorage.getItem(`downloaded_${product.id}`);
    if (!downloaded) {
      fetch("/api/downloads/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      }).catch(console.error);
      localStorage.setItem(`downloaded_${product.id}`, "true");
    }
  };

  // Perform the actual download with progress tracking
  const performDownload = async (product: Product): Promise<boolean> => {
    setState((prev) => ({
      ...prev,
      isDownloading: true,
      progress: 0,
      fileName: product.fileName,
      productTitle: product.title,
      error: null,
    }));

    try {
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", `/api/downloads/${product.id}`, true);
        xhr.responseType = "blob";

        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            setState((prev) => ({ ...prev, progress: percentComplete }));
          }
        };

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

            setTimeout(() => {
              setState((prev) => ({
                ...prev,
                isDownloading: false,
                progress: 0,
                fileName: null,
                productTitle: null,
              }));
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
      setState((prev) => ({
        ...prev,
        isDownloading: false,
        progress: 0,
        fileName: null,
        productTitle: null,
        error: err instanceof Error ? err.message : "Download failed",
      }));
      return false;
    }
  };

  const startDownload = async (product: Product): Promise<boolean> => {
    // Prevent concurrent downloads
    if (state.isDownloading) {
      setState((prev) => ({
        ...prev,
        error: "A download is already in progress",
      }));
      return false;
    }

    // Check for saved email
    const existingEmail = getUserEmail();

    if (!existingEmail) {
      // No email - show modal
      setState((prev) => ({
        ...prev,
        showEmailModal: true,
        pendingProduct: product,
      }));
      return false;
    }

    // Email exists - capture and download
    await captureEmail(existingEmail, product);
    await trackDownload(product);
    return performDownload(product);
  };

  const handleEmailSubmit = async (email: string) => {
    if (!state.pendingProduct) return;

    const product = state.pendingProduct;

    // Close modal first
    setState((prev) => ({
      ...prev,
      showEmailModal: false,
      pendingProduct: null,
    }));

    // Save email
    saveUserEmail(email);

    // Capture in Firebase
    await captureEmail(email, product);

    // Track and download
    await trackDownload(product);
    await performDownload(product);
  };

  const closeEmailModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showEmailModal: false,
      pendingProduct: null,
    }));
  }, []);

  const cancelDownload = () => {
    setState({
      isDownloading: false,
      progress: 0,
      fileName: null,
      productTitle: null,
      error: null,
      showEmailModal: false,
      pendingProduct: null,
    });
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <DownloadContext.Provider
      value={{
        ...state,
        startDownload,
        cancelDownload,
        clearError,
        handleEmailSubmit,
        closeEmailModal,
      }}
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
