export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  downloadUrl: string;
  fileName: string;
  dateAdded: string;
  downloads: number;
  tags: string[];
  version: string;
  fileSize: string;
  // Extended details (optional)
  platform?: "mac" | "windows" | "both";
  requirements?: string;
  author?: string;
  lastUpdated?: string;
  changelog?: string;
  installInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProductData {
  products: Product[];
  categories: Category[];
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'date-newest'
  | 'date-oldest'
  | 'downloads-desc';

export interface SortConfig {
  value: SortOption;
  label: string;
}
