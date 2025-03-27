'use client';

import { useRouter } from 'next/navigation';
import { Products } from '@/types/products';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  products: Products[];
  onMoreClick?: () => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const router = useRouter();

  const handleMoreClick = () => {
    const category = title === '남성' ? 'man' : title === '여성' ? 'woman' : '';
    if (category) {
      router.push(`/products?category=${category}`);
    }
  };

  return (
    <section className="w-full px-8 py-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button className="text-gray-500 text-sm underline hover:text-black" onClick={handleMoreClick}>
          더보기
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
