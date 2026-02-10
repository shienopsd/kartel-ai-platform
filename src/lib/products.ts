import { Product, ProductData, SortOption } from "@/types";
import productsData from "@/data/products.json";

export function getProducts(): Product[] {
  return productsData.products as Product[];
}

export function getCategories() {
  return productsData.categories;
}

export function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: string | null
): Product[] {
  let filtered = products;

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Filter by category
  if (selectedCategory && selectedCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory
    );
  }

  return filtered;
}

export function sortProducts(
  products: Product[],
  sortOption: SortOption
): Product[] {
  const sorted = [...products];

  switch (sortOption) {
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case "date-newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );

    case "date-oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      );

    case "downloads-desc":
      return sorted.sort((a, b) => b.downloads - a.downloads);

    default:
      return sorted;
  }
}
