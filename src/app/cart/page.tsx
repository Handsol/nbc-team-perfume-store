// 'use client';

import CartItemList from '@/components/cart/CartItemList';
import { useAddCartItem, useDeleteCartItem, useUpdateItemQuantity } from '@/libs/hooks/cart/mutations';
import { useGetCartItems } from '@/libs/hooks/cart/queries';
import { CartItem } from '@/types/cart-items';

const CartPage = () => {
  //장바구니 테스트용 변수
  const user_id = '6b25b700-0dff-4f94-8425-462fcfb74d5d';

  return (
    <>
      <h1>CartPage</h1>

      <p>장바구니 목록</p>
      <CartItemList user_id={user_id} />
    </>
  );

  return <div>test</div>;
};
export default CartPage;
