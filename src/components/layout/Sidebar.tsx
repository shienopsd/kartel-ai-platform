"use client";

import { Category, Product } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  categories: Category[];
  products: Product[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
  hideTitle?: boolean;
}

export default function Sidebar({
  categories,
  products,
  selectedCategory,
  onSelectCategory,
  hideTitle = false,
}: SidebarProps) {
  // Filter out placeholder products
  const realProducts = products.filter(
    (p) => p.title && !p.id.startsWith("placeholder")
  );

  // Count products per category
  const getCategoryCount = (categoryName: string) => {
    return realProducts.filter((p) => p.category === categoryName).length;
  };

  const allCount = realProducts.length;

  return (
    <aside
      className="p-6 sticky top-16"
      style={{
        position: "sticky",
        top: "4rem",
        zIndex: 1,
        maxHeight: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      {/* Centered Logo - Desktop Only */}
      {!hideTitle && (
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/kartel-labs-new.png"
              alt="Kartel Labs"
              width={1500}
              height={551}
              className="h-[60px] w-auto"
            />
          </Link>
        </div>
      )}

      {!hideTitle && (
        <h2
          className="text-lg font-bold mb-6"
          style={{ color: "var(--foreground)" }}
        >
          Categories
        </h2>
      )}

      <div className="space-y-2" style={{ position: "relative", zIndex: 10 }}>
        {/* All Products */}
        <button
          onClick={() => onSelectCategory(null)}
          className={clsx(
            "w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between",
            selectedCategory === null || selectedCategory === "all"
              ? "font-medium"
              : "opacity-60 hover:opacity-100"
          )}
          style={{
            background:
              selectedCategory === null || selectedCategory === "all"
                ? "#1B2A4E"
                : "transparent",
            color: "var(--foreground)",
            position: "relative",
            zIndex: 10,
            isolation: "isolate",
          }}
        >
          <span>All Products</span>
          <span
            className="text-sm px-2 py-0.5 rounded-full"
            style={{
              background: "var(--dark-elevated)",
            }}
          >
            {allCount}
          </span>
        </button>

        {/* Category Filters */}
        {categories.map((category) => {
          const count = getCategoryCount(category.name);
          const isActive = selectedCategory === category.name;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.name)}
              className={clsx(
                "w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center justify-between",
                isActive ? "font-medium" : "opacity-60 hover:opacity-100"
              )}
              style={{
                background: isActive
                  ? "#1B2A4E"
                  : "transparent",
                color: "var(--foreground)",
                position: "relative",
                zIndex: 10,
                isolation: "isolate",
              }}
            >
              <span>{category.name}</span>
              <span
                className="text-sm px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--dark-elevated)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Info */}
      {selectedCategory && selectedCategory !== "all" && (
        <div
          className="mt-6 p-4 rounded-lg text-sm opacity-70"
          style={{
            background: "var(--dark-elevated)",
            color: "var(--foreground)",
          }}
        >
          {categories.find((c) => c.name === selectedCategory)?.description}
        </div>
      )}
    </aside>
  );
}
