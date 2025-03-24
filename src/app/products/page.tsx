import ProductList from '@/components/ProductList';
import { getProducts } from '@/libs/api/product/product-api';

const ProductsPage = async () => {
  try {
    const products = await getProducts();
    return <ProductList products={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>제품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default ProductsPage;
