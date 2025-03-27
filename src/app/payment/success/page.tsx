'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <span className="loader"> loading...</span>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl">주문완료</h1>
      <div className="mx-auto max-w-screen-lg px-4 py-8">
        <div className="flex flex-col justify-start gap-2 bg-lightgray px-8 py-6">
          <div className="mb-10 text-center text-xl">고객님의 주문이 완료되었습니다.</div>
          <Link className={`${buttonVariants({ variant: 'default', size: 'lg' })} h-16 w-full text-xl`} href={'/'}>
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
