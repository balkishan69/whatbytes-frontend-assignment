import { Product } from '../types/product';

export function filterProducts(
  products: Product[],
  category?: string,
  priceStr?: string,
  searchQuery?: string
): Product[] {
  let filtered = [...products];

  // Category filter
  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Price filter
  if (priceStr) {
    const maxPrice = parseFloat(priceStr);
    if (!isNaN(maxPrice)) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }
  }

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  return filtered;
}
