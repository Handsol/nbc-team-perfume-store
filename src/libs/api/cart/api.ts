import { CartItem, AddCartData, ApiResponse } from '@/types/cartItems';
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
export const getCartItemList = async (userId: CartItem['userId']): Promise<CartItem[]> => {
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
    .eq('user_id', cartData.userId) //유저아이디와, 제품아이디가 일치하는 데이터가 있는지 체크
    .eq('product_id', cartData.productId)
    .maybeSingle();
  if (checkError) throw checkError;

  let resultData;
  if (checkItem) {
    //이미 존재하면 수량 업데이트
    const newQuantity = checkItem.cart_quantity + cartData.quantity;
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
  cartId: CartItem['cartId'];
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
export const deleteCartItem = async (cartId: CartItem['cartId']): Promise<CartItem> => {
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
export const deleteAllCart = async (userId: CartItem['userId']) => {
  const { error } = await supabase.from('carts').delete().eq('user_id', userId);
  if (error) throw error;
};
