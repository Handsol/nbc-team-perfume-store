import { Products } from '@/types/products';
import { getServerClient } from '@/utils/supabase/serverClient';

const supabase = getServerClient();

//제품 정보 불러오기
export const getProduct = async (id: Products['product_id']): Promise<Products> => {
  const { data: product, error } = await supabase.from('products').select('*').eq('product_id', id).single();
  if (error) throw error;
  return product;
};
