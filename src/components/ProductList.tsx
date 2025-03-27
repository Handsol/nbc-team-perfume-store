'use client';
import { ProductListProps } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:-translate-y-1 transition-all duration-300"
          >
            {/* 제품 상세 페이지 이동 링크 */}

            <Link href={`/products/${product.product_id}`}>
              <div className="relative w-full h-56">
                <Image
                  src={product.product_thumbnail}
                  alt={product.product_title}
                  fill
                  className=" object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-medium text-gray-500 truncate">{product.product_brand}</h2>
                <p className="mt-1 text-base font-semibold text-gray-900 truncate">{product.product_title}</p>
                <p className="mt-2 text-lg font-bold text-gray-800">{product.product_price.toLocaleString()}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;