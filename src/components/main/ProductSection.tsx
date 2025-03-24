'use client';

import ProductCard from './ProductCard';
import { Products } from '@/types/products';

interface ProductSectionProps {
  title: string;
  products: Products[];
  onMoreClick?: () => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, onMoreClick }) => {
  return (
    <section className="w-full px-8 py-12">
      <div className="flex justify-between items-center mb-4">
        <h2>{title}</h2>
        <button onClick={onMoreClick}>더보기</button>
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
