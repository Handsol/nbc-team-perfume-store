"use client"
import useCartStore from '@/zustand/cart-store';
import { useState } from 'react';

const PayMethod = () => {
    const selectedTotal = useCartStore(((state)=>state.selectedTotal))
  
  const methods = ['신용·체크카드', '네이버페이', '카카오페이', '페이코', '토스페이', '가상계좌', '휴대폰'];
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl mb-4">결제 정보</h2>
      <h2>결제금액 : <span className='font-semibold'>{selectedTotal.toLocaleString()}</span>원</h2>
      <div className="items-stretch flex flex-col justify-start py-6  px-8">
        <div className="h-full flex flex-wrap">
          {methods.map((item,index) => {
            return (
              <div className="min-w-[25%] box-border" key={index}>
                <div
                  className={`${
                    selectedMethod === item ? 'border border-black' : 'border border-lightgray'
                  } rounded items-center m-1 box-border`}
                >
                  <button
                    className={`relative h-12 leading-5 text-gray-600 cursor-pointer box-border w-full ${
                      selectedMethod ===item ? 'font-bold' : 'font-normal'}`}
                    type="button"
                    aria-disabled="false"
                    onClick={()=>{setSelectedMethod(item)}}
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
