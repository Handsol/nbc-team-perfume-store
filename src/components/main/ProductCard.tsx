'use client';

import Image from 'next/image';
import { Products } from '@/types/products';

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <Image
        src={product.product_thumbnail}
        alt={product.product_title}
        width={150}
        height={150}
        className="w-full h-48 object-contain"
      />
      <p className="mt-2 text-center text-sm">{product.product_title}</p>
    </div>
  );
};

export default ProductCard;
