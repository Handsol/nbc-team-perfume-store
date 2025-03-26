'use client';

import { useState } from 'react';
import useCartStore from '@/zustand/cart-store';

const PayMethod = () => {
  const selectedTotal = useCartStore((state) => state.selectedTotal);

  const methods = ['신용·체크카드', '네이버페이', '카카오페이', '페이코', '토스페이', '가상계좌', '휴대폰'];
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl">결제 정보</h2>
      <h2>
        결제금액 : <span className="font-semibold">{selectedTotal.toLocaleString()}</span>원
      </h2>
      <div className="flex flex-col items-stretch justify-start px-8 py-6">
        <div className="flex h-full flex-wrap">
          {methods.map((item, index) => {
            return (
              <div className="box-border min-w-[25%]" key={index}>
                <div
                  className={`${
                    selectedMethod === item ? 'border border-black' : 'border border-lightgray'
                  } m-1 box-border items-center rounded`}
                >
                  <button
                    className={`text-gray-600 relative box-border h-12 w-full cursor-pointer leading-5 ${
                      selectedMethod === item ? 'font-bold' : 'font-normal'
                    }`}
                    type="button"
                    aria-disabled="false"
                    onClick={() => {
                      setSelectedMethod(item);
                    }}
                  >
                    {item}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PayMethod;
