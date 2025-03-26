'use client';

import { TCartItem } from '@/types/cart-items';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import useCartStore from '@/zustand/cart-store';
import { useCallback, useState, useEffect } from 'react';

type Props = {
  cartItemList: TCartItem[];
};

const CartPriceWrapper = ({ cartItemList }: Props) => {
  const cartStatus = useCartStore((state) => state);
  const [total, setTotal] = useState(0);
  const [shippingPay, setShippingPay] = useState(0);
  // checkedList를 따로 useState로 관리하지 않음
  const calculateTotal = useCallback(() => {
    const tempCheckedList = cartItemList.filter((cart) => cart.cart_checked);

    let tempTotal = tempCheckedList.reduce((cur, item) => {
      return cur + item.products.product_price * item.cart_quantity;
    }, 0);

    setShippingPay(tempTotal === 0 ? 0 : tempTotal > 50000 ? 0: 3000);// 배송비
    // console.log(shippingPay) 
    if (tempTotal < 50000) {
      tempTotal += shippingPay;
    }

    setTotal(tempTotal);
    return { tempCheckedList, tempTotal };
  }, [cartItemList]);

  useEffect(() => {
    const { tempCheckedList, tempTotal } = calculateTotal();
    cartStatus.setSeletedItems(tempCheckedList); // 체크된 제품 상태 저장
    cartStatus.setSeletedTotal(tempTotal); // 총 금액 상태 저장
  }, [cartItemList, calculateTotal]);

  return (
    <div className="w-full min-w-[360px] grow bg-black p-2 xl:w-80">
      <ul className="flex flex-col gap-4 p-4">
        <li className="flex flex-row items-center justify-between text-white">
          <h2>총 결제 금액</h2>
          <h3>{total.toLocaleString()} 원</h3>
        </li>
        <li className="flex flex-row items-center justify-between text-white">
          <h2>배송비 (+)</h2>
          <h3>{shippingPay} 원</h3>
        </li>
        <li className="my-2 h-0.5 w-full bg-gray"></li>
        <li className="flex flex-row items-center justify-between text-white">
          <h2>결제 예정금액</h2>
          <h3>{total.toLocaleString()} 원</h3>
        </li>
        <div className="flex items-center justify-center">
          <Link
            className={`${buttonVariants({ variant: 'outline', size: 'lg' })} h-16 w-full text-xl ${
              total === 0 ? 'pointer-events-none opacity-50' : ''
            } `}
            href={'/payment'}
            // onClick={() => setStatus}
          >
            주문하기
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default CartPriceWrapper;
