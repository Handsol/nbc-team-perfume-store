'use client';
import { Products, ProductListProps } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* 제품 상세 페이지 이동 링크 */}
            <Link href={`/products/${product.product_id}`}>
              <Image
                src={product.product_thumbnail}
                alt={product.product_title}
                width={200}
                height={48}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-semibold text-gray-800 truncate">{product.product_brand}</h2>
              <p className="text-base text-gray-600 mt-1">{product.product_title}</p>
              <p>{product.product_price.toLocaleString()}원</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
