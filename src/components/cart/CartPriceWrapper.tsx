'use client';

import { TCartItem } from '@/types/cart-items';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import useCartStore from '@/zustand/cart-store';
import { useState, useEffect } from 'react';
import { calculateTotal } from '@/utils/purchase';

type Props = {
  cartItemList: TCartItem[];
};

const CartPriceWrapper = ({ cartItemList }: Props) => {
  const cartStatus = useCartStore((state) => state);
  const [total, setTotal] = useState(0);
  const [shippingPay, setShippingPay] = useState(0);
  // checkedList를 따로 useState로 관리하지 않음

  useEffect(() => {
    const { total, shippingPay, checkedList } = calculateTotal(cartItemList);
    console.log(total, checkedList);
    setTotal(total);
    setShippingPay(shippingPay);
    cartStatus.setSelectedItems(checkedList);
    cartStatus.setSelectedTotal(total); // 총 금액 상태 저장
  }, [cartItemList]);

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
