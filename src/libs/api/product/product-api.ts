import { ProductDetails, Products } from '@/types/products';
import { getServerClient } from '@/utils/supabase/serverClient';

// 제품 리스트 불러오기
export const getProducts = async (category?: string): Promise<Products[]> => {
  const supabase = getServerClient();
  let query = supabase.from('products').select('*');
  if (category) {
    if (category === 'man' || category === 'woman') {
      // "man" 또는 "woman"으로 시작하는 접두사
      query = query.ilike('product_category', `${category}%`);
    } else {
      // "manEDT", "womanEDP" 등 정확한 값
      query = query.eq('product_category', category);
    }
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }
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
