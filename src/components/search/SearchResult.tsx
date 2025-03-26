'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductsForClient } from '@/libs/api/product/search-product';
import { Products } from '@/types/products';
import ProductList from '@/components/product/ProductList';

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
      <div className="container mx-auto flex flex-col items-center px-4 py-8">
        <h1 className="text-xl font-bold">
          입력하신 <span className="text-blue-500">{query}</span> 에 대한 검색 결과입니다.
        </h1>
        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <p className="text-gray-600 mt-4">검색어에 대한 결과가 존재하지 않습니다.</p>
        )}
      </div>
    </Suspense>
  );
};

export default SearchResults;
