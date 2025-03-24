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

  //아이템 수량 변경
  const handleQuantity = (cartId: CartItem['cart_id'], currentQuantity: number, add: boolean) => {
    // 현재 아이템의 수량 값에
    // add 가 true면 + 1/ false면  -1
    let updatedQuantity;
    if (add) {
      updatedQuantity = currentQuantity + 1;
      updateItemQuantity({ cartId, quantity: updatedQuantity });
    } else {
      updatedQuantity = currentQuantity - 1;
      updateItemQuantity({ cartId, quantity: updatedQuantity });
    }
  };

  //아이템 삭제
  const handleDeleteItem = (cartId: CartItem['cart_id']) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      deleteCartItem(cartId);
    }
  };

  //체크된 아이템 총액 계산
  const calculateTotal = () => {
    //카트 데이터중에 checked가 true인 애들만 filter
    // 그 카트의 제품 가격과 수량을 곱해서 총합을 계산 (reduce)
    return cartItemList
      ?.filter((cart) => {
        return cart.cart_checked;
      })
      .reduce((cur, item) => {
        return cur + item.products.product_price * item.cart_quantity;
      }, 0);
  };

  if (isPending) {
    return (
      <div>
        <h2>로딩중</h2>
        {/* <h2>장바구니에 담긴 상품이 없습니다.</h2>
        <h3>원하는 상품을 장바구니에 담아보세요!</h3> */}
      </div>
    );
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요</div>;
  }

  return (
    <div>
      <TestButton />
      <div className="flex flex-row items-start justify-center gap-12 relative">
        <ul>
          {/* 장바구니에 아이템이 없을 때 상황 고려해서 코드 변경 예정 */}
          {cartItemList?.map((item) => {
            const { products } = item;
            let total = products.product_price * item.cart_quantity;
            return (
              <li className="relative flex flex-wrap py-8 px-4 mb-6 items-start bg-lightgray " key={item.cart_id}>
                <input
                  type="checkbox"
                  checked={item.cart_checked || false}
                  onChange={() => toggleCheck({ cartId: item.cart_id, checked: !item.cart_checked })}
                  className="flex items-start mr-4"
                />
                <div className="mr-4">
                  <Image src={products.product_thumbnail} alt={products.product_title} width={200} height={100} />
                </div>
                <div className="flex flex-col min-h-10 w-96 mr-4 justify-between">
                  <div className="mb-8">
                    <h2 className="font-bold mb-4 ">{products.product_brand}</h2>
                    <h3>{products.product_title}</h3>
                  </div>
                  {/* <div className="flex flex-row-reverse	"> */}
                  {/* <div className="flex flex-col">
                      <div className="text-2xl font-light mb-2 text-gray">{products.product_price}</div>
                      <p className="font-thin">수량</p>
                      
                    </div> */}
                  {/* </div> */}
                </div>

                <div className="flex flex-col w-32 mx-4 pt-10">
                  <p className="text-gray">Total</p>
                  <div className="text-2xl font-bold mb-2 text-black">
                    {total} <span className="text-base font-normal">원</span>
                  </div>
                  <div className="flex">
                    <button
                      className="border-2 border-box w-9 h-9 "
                      onClick={() => handleQuantity(item.cart_id, item.cart_quantity, false)}
                    >
                      -
                    </button>
                    <div className="text-center border-2 border-box w-16 h-9 leading-8">{item.cart_quantity}</div>
                    <button
                      className="border-2 border-box w-9 h-9"
                      onClick={() => handleQuantity(item.cart_id, item.cart_quantity, true)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mx-4 pt-16">
                  <button onClick={() => handleDeleteItem(item.cart_id)} className="border-2 p-2">
                    삭제
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="p-4 bg-black text-white w-64">
          <ul className = "flex flex-col gap-4">
            <li className="flex flex-row justify-between items-center">
              <h2>총 결제 금액</h2>
              <h3>{calculateTotal()} 원</h3>
            </li>
            <li className="flex flex-row justify-between items-center">
              <h2>배송비</h2>
              <h3>0 원</h3>
            </li>
            <li className="w-full h-0.5 my-2 bg-gray"></li>
            <li className="flex flex-row justify-between items-center">
              <h2>결제 예정금액</h2>
              <h3>{calculateTotal()} 원</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartItemList;
