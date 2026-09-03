import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import { Star, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
        <Link 
          href="/"
          className="bg-primary hover:bg-[#08376b] text-white px-6 py-2 rounded-lg transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex-1">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8 items-center space-x-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative aspect-square bg-gray-50 rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-sm text-primary uppercase tracking-wider font-semibold mb-2">
            {product.brand || product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
            {product.rating && (
              <div className="flex items-center border-l border-gray-300 pl-4">
                <div className="flex items-center text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="prose prose-sm md:prose-base text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          {/* Client component for interactions */}
          <div className="mt-auto">
            <ProductDetailClient product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
