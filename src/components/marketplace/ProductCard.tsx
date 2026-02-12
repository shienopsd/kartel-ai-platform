"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { Product } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface ProductCardProps {
  product: Product;
  onDownload: (product: Product) => void;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onDownload, onClick }: ProductCardProps) {
  const isPlaceholder = !product.title || product.id.startsWith("placeholder");
  const formattedDate = !isPlaceholder
    ? formatDistanceToNow(new Date(product.dateAdded), {
        addSuffix: true,
      })
    : "";

  if (isPlaceholder) {
    return (
      <div
        className="relative overflow-hidden rounded-lg border"
        style={{
          background: "#1a1a1a",
          borderColor: "var(--dark-border)",
          maxWidth: "320px",
          width: "100%",
          position: "relative",
          zIndex: 10,
          isolation: "isolate",
          opacity: 0.4,
        }}
      >
        {/* Placeholder Thumbnail */}
        <div
          className="h-48"
          style={{ background: "#2a2a2a" }}
        />
        {/* Placeholder Content */}
        <div className="p-5">
          <div
            className="h-6 mb-2 rounded"
            style={{ background: "#2a2a2a" }}
          />
          <div
            className="h-4 mb-4 rounded"
            style={{ background: "#2a2a2a", width: "80%" }}
          />
          <div
            className="h-10 rounded"
            style={{ background: "#2a2a2a" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative overflow-hidden rounded-lg border transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      style={{
        background: "var(--dark-surface)",
        borderColor: "var(--dark-border)",
        boxShadow: "var(--shadow-card)",
        maxWidth: "320px",
        width: "100%",
        position: "relative",
        zIndex: 10,
        isolation: "isolate",
        transition: "all 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={() => onClick?.(product)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 15px 50px -10px rgba(0, 0, 0, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ background: "var(--dark-elevated)" }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: "var(--gradient-card-hover)" }}
        />

        {/* Thumbnail Image */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Category Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium z-20 badge-hover transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
            color: "white",
          }}
        >
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-bold mb-2 line-clamp-1"
          style={{ color: "var(--foreground)" }}
        >
          {product.title}
        </h3>

        <p
          className="text-sm mb-4 line-clamp-2 opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          {product.description}
        </p>

        {/* Metadata */}
        <div
          className="flex items-center justify-between text-xs mb-4 opacity-60"
          style={{ color: "var(--foreground)" }}
        >
          <span>{formattedDate}</span>
          <span>{product.downloads} downloads</span>
        </div>

        {/* Download Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDownload(product);
          }}
          className="w-full py-2.5 px-4 rounded-md font-medium text-white button-hover cursor-pointer flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
          }}
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
