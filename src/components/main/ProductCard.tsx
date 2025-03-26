'use client';

import Image from 'next/image';
import { Products } from '@/types/products';
import Link from 'next/link';

interface ProductCardProps {
  product: Products;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.product_id}`}>
      <div className="flex h-[150px] w-[150px] flex-col items-center transition-transform duration-300 hover:scale-105">
        <Image
          src={product.product_thumbnail}
          alt={product.product_title}
          width={150}
          height={150}
          className="h-full w-full object-cover"
        />
        <p className="mt-2 text-center text-sm">{product.product_title}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
