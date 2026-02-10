"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/marketplace/SearchBar";
import SortDropdown from "@/components/marketplace/SortDropdown";
import ProductGrid from "@/components/marketplace/ProductGrid";
import DownloadProgressBar from "@/components/download/DownloadProgressBar";
import { getProducts, getCategories, filterProducts, sortProducts } from "@/lib/products";
import { SortOption, Product } from "@/types";
import { useDownloadContext } from "@/contexts/DownloadContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  const { startDownload } = useDownloadContext();

  // Get all products and categories
  const allProducts = getProducts();
  const categories = getCategories();

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, searchQuery, selectedCategory);
    return sortProducts(filtered, sortOption);
  }, [allProducts, searchQuery, selectedCategory, sortOption]);

  const handleDownload = (product: Product) => {
    startDownload(product);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar Container */}
        <div
          className="w-64 border-r"
          style={{
            background: "var(--dark-surface)",
            borderColor: "var(--dark-border)",
            position: "relative",
            zIndex: 10,
            isolation: "isolate",
          }}
        >
          <Sidebar
            categories={categories}
            products={allProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1
              className="text-5xl font-bold mb-4"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Workflows & Plugins
            </h1>
            <p
              className="text-lg opacity-70 max-w-2xl mx-auto"
              style={{ color: "var(--foreground)" }}
            >
              Free workflows and plugins created by Kartel AI generative engineers.
              Enhance your automation and streamline your processes.
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <SearchBar onSearch={setSearchQuery} />
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {/* Results Count */}
          <div
            className="mb-6 text-sm opacity-60"
            style={{ color: "var(--foreground)" }}
          >
            Showing {filteredAndSortedProducts.length} of {allProducts.length}{" "}
            products
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredAndSortedProducts}
            onDownload={handleDownload}
          />
        </main>
      </div>

      <Footer />
      <DownloadProgressBar />
    </div>
  );
}
