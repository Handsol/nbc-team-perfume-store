'use client';

import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/product/ProductList';
import { useEffect, useState } from 'react';
import { Products } from '@/types/products';
import { Suspense } from 'react';
import { getProductsForClient } from '@/libs/api/product/search-product';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProductsForClient();
      const results = allProducts.filter(
        (product) =>
          product.product_title.toLowerCase().includes(query) || product.product_tags.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <Suspense>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold">
          입력하신 <span className="text-blue-500">{query}</span> 에 대한 검색 결과입니다.
        </h1>
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p className="mt-4 text-gray-600">검색어에 대한 결과가 존재하지 않습니다.</p>
        )}
      </div>
    </Suspense>
  );
};

export default SearchResults;
