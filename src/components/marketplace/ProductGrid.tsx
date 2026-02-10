"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onDownload: (product: Product) => void;
}

export default function ProductGrid({ products, onDownload }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p
          className="text-lg opacity-60 mb-2"
          style={{ color: "var(--foreground)" }}
        >
          No products found
        </p>
        <p
          className="text-sm opacity-40"
          style={{ color: "var(--foreground)" }}
        >
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
