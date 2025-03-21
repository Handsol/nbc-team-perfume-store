import { CartItem, PostCartData } from '@/types/cartItems';
import { Products } from '@/types/products';
import { createClient } from '@/utils/supabase/createClient';

const supabase = createClient();

//제품 정보 불러오기 // 다른 페이지에서 비슷한 용도로 사용되는 api가 있으면 삭제예정
export const getProduct = async (id: Products['id']): Promise<Products> => {
  const { data: product, error } = await supabase.from('products').select('*').eq('product_id', id).single();
  if (error) throw error;

  return product;
};

//장바구니의 모든 아이템 리스트 불러오기
export const getCartItemList = async (): Promise<CartItem[]> => {
  const { data: cartItemList, error } = await supabase.from('carts').select('*');
  if (error) throw error;

  return cartItemList;
};

//장바구니에 아이템 추가하기
export const postCartItem = async (cartData: PostCartData): Promise<void> => {
  const { error } = await supabase.from('carts').insert(cartData)
  if (error) throw error;
};

//장바구니 아이템의 수량 변경하기
export const patchCartItemQuantity = async (id: Products['id'], quantity: number): Promise<void> => {
  const { error } = await supabase.from('carts').update({ cart_quantity: quantity }).eq('product_id', id)
  if (error) throw error;
};

//장바구니 아이템 삭제하기
export const deleteCartItem = async (id: Products['id']): Promise<void> => {
  const { error } = await supabase.from('carts').delete().eq('product_id', id)
  if (error) throw error;
};
