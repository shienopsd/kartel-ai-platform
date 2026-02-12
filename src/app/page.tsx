"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import SearchBar from "@/components/marketplace/SearchBar";
import SortDropdown from "@/components/marketplace/SortDropdown";
import ProductGrid from "@/components/marketplace/ProductGrid";
import DownloadProgressBar from "@/components/download/DownloadProgressBar";
import EmailCaptureModal from "@/components/modals/EmailCaptureModal";
import ProductDetailModal from "@/components/modals/ProductDetailModal";
import { getProducts, getCategories, filterProducts, sortProducts } from "@/lib/products";
import { SortOption, Product } from "@/types";
import { useDownloadContext } from "@/contexts/DownloadContext";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    startDownload,
    showEmailModal,
    pendingProduct,
    handleEmailSubmit,
    closeEmailModal
  } = useDownloadContext();

  // Get all products and categories
  const allProducts = getProducts();
  const categories = getCategories();

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, searchQuery, selectedCategory);
    return sortProducts(filtered, sortOption);
  }, [allProducts, searchQuery, selectedCategory, sortOption]);

  // Count only real products (not placeholders)
  const realProductCount = allProducts.filter(p => p.title && !p.id.startsWith("placeholder")).length;
  const filteredRealProductCount = filteredAndSortedProducts.filter(p => p.title && !p.id.startsWith("placeholder")).length;

  const handleDownload = (product: Product) => {
    startDownload(product);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />

      <div className="flex flex-1">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div
          className="hidden md:block w-64 border-r flex-shrink-0"
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

        {/* Mobile Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 mobile-menu-backdrop"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div
              className="absolute left-0 top-0 h-full w-72 mobile-menu-drawer"
              style={{
                background: "var(--dark-surface)",
                borderRight: "1px solid var(--dark-border)",
              }}
            >
              {/* Drawer Header */}
              <div
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: "var(--dark-border)" }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  Categories
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X size={24} style={{ color: "var(--foreground)" }} />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="p-4">
                <Sidebar
                  categories={categories}
                  products={allProducts}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                  hideTitle
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 pt-6">
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Hero Section */}
          <div className="mb-4 text-center">
            <h1
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Workflows & Plugins
            </h1>
            <p
              className="text-xs md:text-sm opacity-70 max-w-2xl mx-auto px-4"
              style={{ color: "var(--foreground)" }}
            >
              Free workflows and plugins created by Kartel AI generative engineers.
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <SearchBar onSearch={setSearchQuery} />
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {/* Results Count */}
          <div
            className="mb-3 text-sm opacity-60"
            style={{ color: "var(--foreground)" }}
          >
            Showing {filteredRealProductCount} of {realProductCount}{" "}
            {realProductCount === 1 ? "product" : "products"}
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredAndSortedProducts}
            onDownload={handleDownload}
            onProductClick={handleProductClick}
          />
          </div>
        </main>
      </div>

      <Footer />
      <DownloadProgressBar />

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={closeEmailModal}
        onSubmit={handleEmailSubmit}
        productTitle={pendingProduct?.title || ""}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onDownload={(product) => {
          setSelectedProduct(null);
          handleDownload(product);
        }}
      />
    </div>
  );
}
