"use client";

import { useState, useCallback } from "react";
import { Product } from "@/types";

const USER_EMAIL_KEY = "kartel_user_email";

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  // Check if user has email saved
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
      }).catch((err) => console.error("Failed to track download:", err));
      localStorage.setItem(`downloaded_${product.id}`, "true");
    }
  };

  // Trigger the actual file download
  const triggerDownload = (product: Product) => {
    const link = document.createElement("a");
    link.href = `/api/downloads/${product.id}`;
    link.download = product.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Main download function - called when user clicks download button
  const downloadFile = useCallback(async (product: Product) => {
    setError(null);
    const existingEmail = getUserEmail();

    if (!existingEmail) {
      // No email on file - show modal
      setPendingProduct(product);
      setShowEmailModal(true);
      return false;
    }

    // Email exists - proceed with download
    setIsDownloading(true);
    try {
      // Capture email for this download (track returning user activity)
      await captureEmail(existingEmail, product);

      // Track download analytics
      await trackDownload(product);

      // Trigger download
      triggerDownload(product);

      setIsDownloading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
      setIsDownloading(false);
      return false;
    }
  }, [getUserEmail]);

  // Called when user submits email in modal
  const handleEmailSubmit = useCallback(async (email: string) => {
    if (!pendingProduct) return;

    setIsDownloading(true);
    try {
      // Save email to localStorage
      saveUserEmail(email);

      // Capture email in Firebase
      await captureEmail(email, pendingProduct);

      // Track download analytics
      await trackDownload(pendingProduct);

      // Close modal
      setShowEmailModal(false);

      // Trigger download
      triggerDownload(pendingProduct);

      // Clear pending product
      setPendingProduct(null);
      setIsDownloading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
      setIsDownloading(false);
      throw err;
    }
  }, [pendingProduct, saveUserEmail]);

  // Close modal without downloading
  const closeEmailModal = useCallback(() => {
    setShowEmailModal(false);
    setPendingProduct(null);
  }, []);

  return {
    downloadFile,
    isDownloading,
    error,
    // Modal state
    showEmailModal,
    pendingProduct,
    handleEmailSubmit,
    closeEmailModal,
  };
}
