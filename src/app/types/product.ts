export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  stock: string;
  image: string;
  originalPrice?: number;
}

export interface ProductFilters {
  selectedCategory: string;
  selectedFilters: string[];
  isFilterSidebarOpen: boolean;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
