import { getProducts } from '@/libs/products';
import ProductList from '@/components/product-list';
import { createClient } from '@/utils/supabase/create-client';

export default async function ProductsPage() {
  const supabase = createClient();
  try {
    const products = await getProducts(supabase);
    return <ProductList products={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>제품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
}
