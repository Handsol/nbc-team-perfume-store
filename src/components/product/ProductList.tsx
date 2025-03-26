'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductListProps } from '@/types/products';

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="overflow-hidden rounded-lg border bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            {/* 제품 상세 페이지 이동 링크 */}
            <Link href={`/products/${product.product_id}`}>
              <Image
                src={product.product_thumbnail}
                alt={product.product_title}
                width={200}
                height={48}
                className="h-48 w-full object-cover"
              />
              <h2 className="text-gray-800 truncate text-lg font-semibold">{product.product_brand}</h2>
              <p className="text-gray-600 mt-1 text-base">{product.product_title}</p>
              <p>{product.product_price.toLocaleString()}원</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
