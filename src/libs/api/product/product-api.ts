import { ProductDetails } from '@/types/products';
import { createClient } from '@/utils/supabase/create-client';

// 제품 상세 불러오기
export const getProductDetails = async (id: ProductDetails['product_id']): Promise<ProductDetails> => {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from('products')
    .select('*, products_photos(product_img_path)')
    .eq('product_id', id)
    .single();
  if (error) throw error;
  console.log(product.products_photos);
  return product;
};
