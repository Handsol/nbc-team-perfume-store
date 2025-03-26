'use client';

import OrderItems from '@/components/payment/OrderItems';
import PayMethod from '@/components/payment/PayMethod';
import PayUser from '@/components/payment/PayUser';
import Shipping from '@/components/payment/Shipping';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const PaymentPage = () => {
  return (
    <div className="container mx-auto my-10 flex flex-col gap-2">
      <h1 className="mb-4 text-2xl">주문/결제</h1>
      <PayUser />
      <Shipping />
      <OrderItems />
      <PayMethod />

      <div className="flex items-center justify-center">
        <Link
          className={`${buttonVariants({ variant: 'default', size: 'lg' })} h-16 w-full text-xl`}
          href={'/payment/success'}
        >
          결제하기
        </Link>
      </div>
    </div>
  );
};
export default PaymentPage;
