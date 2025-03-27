'use client';

import { useState } from 'react';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import { TAddress } from '@/types/shipping';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Shipping = () => {
  const [userDetailAddress, setUserDetailAddress] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    fullAddress: '',
    zoneCode: '',
    extraAddress: ''
  });
  // const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(process.env.NEXT_PUBLIC_postcodeScriptUrl);

  const handleComplete = (data: TAddress) => {
    let fullAddress = data.address; // 주소 변수
    let extraAddress = ''; // 참고항목 변수
    let zoneCode = data.zonecode; //우편번호 변수

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += ` (${data.bname})`;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `,${data.buildingName}` : data.buildingName;
      }
      // fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setShippingInfo({
      fullAddress,
      extraAddress,
      zoneCode
    });
  };

  const handleGetAddress = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl">배송 정보</h2>
      <div className="flex flex-col justify-start gap-6 px-8 py-6">
        <div className="container flex flex-row gap-6">
          <p className="w-32"> 받는 분</p>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center gap-3">
              <Input
                type="text"
                defaultValue={shippingInfo.zoneCode}
                placeholder="우편번호"
                required
                className="h-12"
              />
              <Button type="submit" onClick={handleGetAddress} className="h-12">
                우편번호 검색
              </Button>
            </div>
            <div className="flex w-full items-center gap-3">
              <Input type="text" defaultValue={shippingInfo.fullAddress} placeholder="주소" required className="h-12" />
              <Input type="text" defaultValue={shippingInfo.extraAddress} placeholder="참고항목" className="h-12" />
            </div>
            <Input
              type="text"
              value={userDetailAddress}
              onChange={(e) => setUserDetailAddress(e.target.value)}
              placeholder="상세 주소"
              className="h-12"
              required
            />
          </div>
        </div>
        <div className="container flex flex-row items-center gap-6">
          <p className="w-32">배송 메시지</p>
          <div className="flex w-full items-center">
            <Input placeholder="ex) 배송 전 연락주세요." className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
