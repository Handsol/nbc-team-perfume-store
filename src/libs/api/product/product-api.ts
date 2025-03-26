import { ProductDetails, Products } from '@/types/products';
import { getServerClient } from '@/utils/supabase/serverClient';
{
  /* 제가 이해하기 위해 주석이 좀 더러울 수 있습니다 pr 확인 후 전부 제거 하겠습니다 */
}
// 제품 리스트 불러오기
export const getProducts = async (
  category?: string,
  page: number = 1, // 페이지 번호 : 몇 번째 페이지? 기본값 1
  limit: number = 12 // 한 페이지에 보여줄 제품 수 12
): Promise<{ products: Products[]; total: number }> => {
  const supabase = getServerClient();
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (category) {
    if (category === 'man' || category === 'woman') {
      // "man" 또는 "woman"으로 시작하는 접두사
      query = query.ilike('product_category', `${category}%`);
    } else {
      // "manEDT", "womanEDP" 등 정확한 값
      query = query.eq('product_category', category);
    }
  }

  {
    /* 페이지네이션 계산 : 몇 번째 제품부터 몇 번째까지 가져올지 정함 */
  }
  const from = (page - 1) * limit; // 시작점 : (페이지 번호 - 1) * 한 페이지당 개수
  const to = from + limit - 1; // 끝점 : 시작점 + 한 페이지 개수 -1
  query = query.range(from, to); // 쿼리에 범위 적용 (0~9)

  const { data, error, count } = await query;
  if (error) {
    throw error;
  }
  return { products: data as Products[], total: count || 0 }; // 12개 제품이랑 총 개수 반환
};

// 제품 리스트 (팀원용, 필터링/페이지네이션 X)
export const getAllProducts = async (): Promise<Products[]> => {
  const supabase = getServerClient();
  const { data, error } = await supabase.from('products').select('*'); // 모든 제품만 가져옴, count 없음

  if (error) throw error;
  return data as Products[];
};

//제품 정보 불러오기
export const getProductById = async (id: Products['product_id']): Promise<Products> => {
  const supabase = getServerClient();
  const { data: product, error } = await supabase.from('products').select('*').eq('product_id', id).single();
  if (error) throw error;
  return product;
};

// 제품 상세 불러오기
export const getProductDetails = async (id: ProductDetails['product_id']): Promise<ProductDetails> => {
  const supabase = getServerClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*, products_photos(product_img_path)')
    .eq('product_id', id)
    .single();

  if (error) throw error;
  return product;
};
