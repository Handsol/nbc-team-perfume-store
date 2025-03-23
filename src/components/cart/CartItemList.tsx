'use client';

import { useGetCartItems } from '@/libs/hooks/cart/queries';
import TestButton from '@/components/cart/TestButton';
import { useDeleteCartItem, useToggleChecked, useUpdateItemQuantity } from '@/libs/hooks/cart/mutations';
import { CartItem } from '@/types/cart-items';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CartItemListProps = {
  user_id: CartItem['user_id'];
};

const CartItemList = ({ user_id }: CartItemListProps) => {
  //카트 리스트 불러오기
  const { data: cartItemList, isPending, isError } = useGetCartItems(user_id);

  //카트 수량 업데이트
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();
  //카트 삭제
  const { mutate: deleteCartItem } = useDeleteCartItem();
  //장바구니 체크 토글
  const { mutate: toggleCheck } = useToggleChecked();

  //아이템 수량 변경 (일단 변경 되는지만)
  const handleQuantity = (cartId: CartItem['cart_id']) => {
    // 현재 아이템의 수량 값을 상태에 저장하고
    // 플러스 버튼은 그 수량에 +1 마이너스는 -1 하도록 변경
    updateItemQuantity({ cartId, quantity: 100 });
  };

  //아이템 삭제
  const handleDeleteItem = (cartId: CartItem['cart_id']) => {
    deleteCartItem(cartId);
  };

  if (isPending) {
    return (
      <div>
        <h2>장바구니에 담긴 상품이 없습니다.</h2>
        <h3>원하는 상품을 장바구니에 담아보세요!</h3>
      </div>
    );
  }

  // if (isError) {
  //   return <div>test is error</div>;
  // }

  return (
    <div>
      {/* <TestButton /> */}
      <ul>
        {/* 장바구니에 아이템이 없을 때 상황 고려해서 코드 변경 예정 */}
        {cartItemList?.map((item) => {
          const { products } = item;
          let total = products.product_price * item.cart_quantity;
          return (
            <li className="border-1 p-2 bg-slate-50 flex items-center">
              <input type="checkbox" checked={item.cart_checked} onChange={() => toggleCheck(item.cart_id)} />
              <div>
                <Image src={products.product_thumbnail} alt={products.product_title} width={200} height={100} />
              </div>
              <div className="border-r-2">
                <h2>{products.product_brand}</h2>
                <h3>{products.product_title}</h3>
                <div>{products.product_price}</div>
                <div className="flex items-center">
                  <button className="border-2 border-box w-9 h-9 ">-</button>
                  <div className="text-center border-2 border-box w-16 h-9 leading-8">{item.cart_quantity}</div>
                  <button className="border-2 border-box w-9 h-9">+</button>
                </div>
              </div>
              <div className="border-r-2">
                <p>total</p>
                <div>{total}</div>
              </div>
              <div>
                <button onClick={() => handleDeleteItem(item.cart_id)} className="border-2 p-2">
                  삭제
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>d</div>
    </div>
  );
};

export default CartItemList;
