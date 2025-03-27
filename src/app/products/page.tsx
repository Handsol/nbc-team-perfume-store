import { getProducts } from '@/libs/api/product/product-api';
import ProductList from '@/components/product/ProductList';
import PaginationControls from '@/components/pagination/paginationControls';

const PRODUCTS_PER_PAGE = 12; // 한 페이지에 12개

const ProductsPage = async ({ searchParams }: { searchParams: { category?: string; page?: string } }) => {
  // URL 쿼리 파라미터에서 'category' 가져오기
  const category = searchParams.category;
  const page = parseInt(searchParams.page || '1', 10);

  try {
    const { products, total } = await getProducts(category, page, PRODUCTS_PER_PAGE);
    // 총 페이지 수 계산
    const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

    return (
      <div>
        {/* 제품 목록 */}
        <ProductList products={products} />
        {/* 페이지 버튼 */}
        <PaginationControls currentPage={page} totalPages={totalPages} category={category} />
      </div>
    );
  } catch {
    return <div>제품 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default ProductsPage;
