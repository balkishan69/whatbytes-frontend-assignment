import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { filterProducts } from '@/lib/filterProducts';
import { Suspense } from 'react';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const priceStr = typeof resolvedParams.price === 'string' ? resolvedParams.price : undefined;
  const searchQuery = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  const filteredProducts = filterProducts(products, category, priceStr, searchQuery);

  return (
    <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
      <div className="flex flex-col md:flex-row gap-8 flex-1">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Suspense fallback={<div className="bg-primary h-64 rounded-lg w-full" />}>
            <ProductFilters />
          </Suspense>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

