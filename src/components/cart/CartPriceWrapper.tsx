'use client';

import { TCartItem } from '@/types/cart-items';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import useCartStore from '@/zustand/cart-store';

type Props = {
  cartItemList: TCartItem[];
};

const CartPriceWrapper = ({ cartItemList }: Props) => {
  const cartStatus = useCartStore((state) => state);
  let checkedList: TCartItem[];
  let total: number;
  // 결제금액 계산 함수
  const calculateTotal = () => {
    checkedList = cartItemList?.filter((cart) => {
      return cart.cart_checked;
    });
    
    total = checkedList.reduce((cur, item) => {
      return cur + item.products.product_price * item.cart_quantity;
    }, 0);
    
    const shippingPay = total === 0 ? 0 : 3000; //배송비
    if (total < 50000) {
      total += shippingPay;
    }
    return total;
  };
  const setStatus = () => {
    cartStatus.setSeletedItems(checkedList); // 체크된 제품 상태저장
    cartStatus.setSeletedTotal(total); // 총금액 상태저장
  };
  return (
    <div className="w-full min-w-[360px] grow bg-black p-2 xl:w-80">
      <ul className="flex flex-col gap-4 p-4">
        <li className="flex flex-row items-center justify-between text-white">
          <h2>총 결제 금액</h2>
          <h3>{calculateTotal().toLocaleString()} 원</h3>
        </li>
        <li className="flex flex-row items-center justify-between text-white">
          <h2>배송비 (+)</h2>
          <h3>0 원</h3>
        </li>
        <li className="my-2 h-0.5 w-full bg-gray"></li>
        <li className="flex flex-row items-center justify-between text-white">
          <h2>결제 예정금액</h2>
          <h3>{calculateTotal()?.toLocaleString()} 원</h3>
        </li>
        <div className="flex items-center justify-center">
          <Link
            className={`${buttonVariants({ variant: 'outline', size: 'lg' })} h-16 w-full text-xl ${
              calculateTotal() === 0 ? 'pointer-events-none opacity-50' : ''} `}
            href={'/payment'}
            onClick={() => setStatus}
          >
            주문하기
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default CartPriceWrapper;
