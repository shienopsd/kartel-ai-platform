"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Download, Monitor, Apple, Calendar, Package, FileText, User } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";
import { formatDistanceToNow, format } from "date-fns";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onDownload,
}: ProductDetailModalProps) {
  // State for managing exit animation
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Sync shouldRender with isOpen prop
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Unified close handler with animation
  const handleClose = useCallback(() => {
    if (isClosing) return; // Prevent multiple triggers

    setIsClosing(true);

    // Small delay to ensure exit classes are applied before triggering transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Add 'closing' class to trigger the transition
        const backdrop = document.querySelector('.modal-backdrop-exit');
        const content = document.querySelector('.modal-content-exit');
        if (backdrop) backdrop.classList.add('closing');
        if (content) content.classList.add('closing');
      });
    });

    // Wait for animation to complete, then notify parent
    setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  }, [isClosing, onClose]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isClosing) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isClosing, handleClose]);

  if (!shouldRender || !product) return null;

  const formattedDate = formatDistanceToNow(new Date(product.dateAdded), {
    addSuffix: true,
  });

  const fullDate = format(new Date(product.dateAdded), "MMMM d, yyyy");

  const getPlatformIcon = () => {
    switch (product.platform) {
      case "mac":
        return <Apple size={16} />;
      case "windows":
        return <Monitor size={16} />;
      case "both":
        return (
          <div className="flex items-center gap-1">
            <Apple size={16} />
            <Monitor size={16} />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <Apple size={16} />
            <Monitor size={16} />
          </div>
        );
    }
  };

  const getPlatformText = () => {
    switch (product.platform) {
      case "mac":
        return "macOS";
      case "windows":
        return "Windows";
      case "both":
        return "macOS & Windows";
      default:
        return "macOS & Windows";
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4${
        isClosing ? ' modal-backdrop-exit' : ' modal-backdrop'
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      }}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl${
          isClosing ? ' modal-content-exit' : ' modal-content'
        }`}
        style={{
          background: "var(--dark-surface)",
          border: "1px solid var(--dark-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} style={{ color: "var(--foreground)", opacity: 0.6 }} />
        </button>

        {/* Thumbnail */}
        <div
          className="relative h-64 w-full overflow-hidden rounded-t-xl"
          style={{ background: "var(--dark-elevated)" }}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />
          {/* Category Badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
              color: "white",
            }}
          >
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--foreground)" }}
          >
            {product.title}
          </h2>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm opacity-70">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={14} />
              <span>{product.downloads} downloads</span>
            </div>
            <div className="flex items-center gap-1">
              <Package size={14} />
              <span>v{product.version}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={14} />
              <span>{product.fileSize}</span>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3
              className="text-sm font-semibold mb-2 opacity-50"
              style={{ color: "var(--foreground)" }}
            >
              DESCRIPTION
            </h3>
            <p
              className="text-sm leading-relaxed opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              {product.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Platform */}
            <div
              className="p-4 rounded-lg"
              style={{ background: "var(--dark-elevated)" }}
            >
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {getPlatformIcon()}
                <span className="text-xs font-semibold">PLATFORM</span>
              </div>
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                {getPlatformText()}
              </p>
            </div>

            {/* Author */}
            <div
              className="p-4 rounded-lg"
              style={{ background: "var(--dark-elevated)" }}
            >
              <div className="flex items-center gap-2 mb-1 opacity-50">
                <User size={14} />
                <span className="text-xs font-semibold">AUTHOR</span>
              </div>
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                {product.author || "Kartel AI Team"}
              </p>
            </div>

            {/* Requirements */}
            {product.requirements && (
              <div
                className="p-4 rounded-lg col-span-2"
                style={{ background: "var(--dark-elevated)" }}
              >
                <div className="flex items-center gap-2 mb-1 opacity-50">
                  <Package size={14} />
                  <span className="text-xs font-semibold">REQUIREMENTS</span>
                </div>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>
                  {product.requirements}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-sm font-semibold mb-2 opacity-50"
                style={{ color: "var(--foreground)" }}
              >
                TAGS
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: "var(--dark-elevated)",
                      color: "var(--foreground)",
                      opacity: 0.8,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Install Instructions */}
          {product.installInstructions && (
            <div className="mb-6">
              <h3
                className="text-sm font-semibold mb-2 opacity-50"
                style={{ color: "var(--foreground)" }}
              >
                INSTALLATION
              </h3>
              <p
                className="text-sm leading-relaxed opacity-80"
                style={{ color: "var(--foreground)", whiteSpace: "pre-line" }}
              >
                {product.installInstructions}
              </p>
            </div>
          )}

          {/* Changelog */}
          {product.changelog && (
            <div className="mb-6">
              <h3
                className="text-sm font-semibold mb-2 opacity-50"
                style={{ color: "var(--foreground)" }}
              >
                WHAT'S NEW IN v{product.version}
              </h3>
              <p
                className="text-sm leading-relaxed opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                {product.changelog}
              </p>
            </div>
          )}

          {/* Release Date */}
          <div className="mb-6 text-xs opacity-50">
            Released on {fullDate}
          </div>

          {/* Download Button */}
          <button
            onClick={() => onDownload(product)}
            className="w-full py-3 px-4 rounded-lg font-medium text-white button-hover cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
            }}
          >
            <Download size={18} />
            Download ({product.fileSize})
          </button>
        </div>
      </div>
    </div>
  );
}
