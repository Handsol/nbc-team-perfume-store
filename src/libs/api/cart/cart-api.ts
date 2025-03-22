import { CartItem, AddCartData } from '@/types/cart-items';
import { createClient } from '@/utils/supabase/create-client';

const supabase = createClient();

//장바구니의 모든 아이템 리스트 불러오기
export const getCartItemList = async (userId: CartItem['user_id']): Promise<CartItem[]> => {
  const { data: cartItemList, error } = await supabase.from('carts').select('*').eq('user_id', userId);
  if (error) throw error;

  return cartItemList;
};

//장바구니에 아이템 추가하기 //이미 존재하는 아이템의 경우 수량 업데이트
export const addCartItem = async (cartData: AddCartData): Promise<CartItem> => {
  //이미 장바구니에 존재하는 아이템인지 체크
  const { data: checkItem, error: checkError } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', cartData.user_id) //유저아이디와, 제품아이디가 일치하는 데이터가 있는지 체크
    .eq('product_id', cartData.product_id)
    .maybeSingle();
  if (checkError) throw checkError;

  let resultData;
  if (checkItem) {
    //이미 존재하면 수량 업데이트
    const newQuantity = checkItem.cart_quantity + cartData.cart_quantity;
    const { data, error } = await supabase
      .from('cart')
      .update({ cart_quantity: newQuantity })
      .eq('cart_id', checkItem.cart_id)
      .select()
      .single();
    if (error) throw error;
    resultData = data;
  } else {
    const { data: addedCartItem, error: addCartError } = await supabase
      .from('carts')
      .insert(cartData)
      .select()
      .single();
    if (addCartError) throw addCartError;
    resultData = addedCartItem;
  }

  return resultData;
};

//장바구니 아이템의 수량 변경하기
export const updateCartItemQuantity = async ({
  cartId,
  quantity
}: {
  cartId: CartItem['cart_id'];
  quantity: number;
}): Promise<CartItem> => {
  const { data: updateCartItem, error } = await supabase
    .from('carts')
    .update({ cart_quantity: quantity })
    .eq('cart_id', cartId)
    .select()
    .single();
  if (error) throw error;

  return updateCartItem;
};

//장바구니 아이템 삭제하기
export const deleteCartItem = async (cartId: CartItem['cart_id']): Promise<CartItem> => {
  const { data: deletedCartItem, error } = await supabase
    .from('carts')
    .delete()
    .eq('cart_id', cartId)
    .select()
    .single();
  if (error) throw error;

  return deletedCartItem;
};

//장바구니 전체 비우기(사용자)
export const deleteAllCart = async (userId: CartItem['user_id']) => {
  const { error } = await supabase.from('carts').delete().eq('user_id', userId);
  if (error) throw error;
};
