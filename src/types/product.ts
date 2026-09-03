export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  brand?: string;
}
