import PayMethod from '@/components/payment/PayMethod';
import Shipping from '@/components/payment/Shipping';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const PaymentPage = () => {
  const moveToSuccess = () => {};
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-4">주문/결제</h1>
      <Shipping />
      <PayMethod />
      <div className="flex justify-center items-center mb-10">
        <Link
          className={`${buttonVariants({ variant: 'default', size: 'lg' })} w-80 h-16 text-xl`}
          href={'/payment/success'}
        >
          결제하기
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
