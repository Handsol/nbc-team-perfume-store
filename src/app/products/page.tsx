import ProductList from '@/components/product/ProductList';
import { getProducts } from '@/libs/api/product/product-api';

const ProductsPage = async ({ searchParams }: { searchParams: { category?: string } }) => {
  // URL 쿼리 파라미터에서 'category' 가져오기
  const category = searchParams.category;
  try {
    const products = await getProducts(category);
    return <ProductList products={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>제품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default ProductsPage;
