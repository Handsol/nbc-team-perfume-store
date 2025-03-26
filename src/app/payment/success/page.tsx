'use client';

import Loading from '@/app/loading';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const PaymentSuccessPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl">주문완료</h1>
      <div className="mx-auto max-w-screen-lg px-4 py-8">
        <div className="flex flex-col justify-start gap-2 bg-lightgray px-8 py-6">
          <div className="text-center text-xl mb-10">고객님의 주문이 완료되었습니다.</div>
          {/* <h2 className="text-xl mb-4">주문자 정보</h2> */}
          {/* <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">이름</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div>

        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">이메일 주소</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div>
        
        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">연락처</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div>

        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">배송지</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div>

        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">결제금액</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div>

        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">결제수단</p>
          <div className="flex items-center w-full">
            <p></p>
          </div>
        </div> */}

          <Link
            className={`${buttonVariants({ variant: 'default', size: 'lg' })} h-16 w-full text-xl`}
            href={'/'}
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
