import { getBrowserClient } from '@/utils/supabase/browserClient';

// 검색용 제품 리스트 불러오기
export const getProductsForClient = async () => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    throw error;
  }
  return data;
};
