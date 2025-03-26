'use client';
import { TAddress } from '@/types/shipping';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Shipping = () => {
  const [userFullAddress, setUserFullAddress] = useState('');
  const [userZoneCode, setZoneCode] = useState('');
  const [userExtraAddress, setExtraAddress] = useState('');
  const [userDetailAddress, setUserDetailAddress] = useState('');
  const postcodeScriptUrl = 'http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(postcodeScriptUrl);

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
    setUserFullAddress(fullAddress);
    setZoneCode(zoneCode);
    setExtraAddress(extraAddress);
  };

  const handleGetAddress = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl mb-4">배송 정보</h2>
      <div className="flex flex-col gap-6 justify-start py-6 px-8">
        <div className="flex flex-row gap-6 container">
          <p className="w-32"> 받는 분</p>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center w-full gap-3">
              <Input type="text" defaultValue={userZoneCode} placeholder="우편번호" required className="h-12" />
              <Button type="submit" onClick={handleGetAddress} className="h-12">
                우편번호 검색
              </Button>
            </div>
            <div className="flex items-center w-full gap-3">
              <Input type="text" defaultValue={userFullAddress} placeholder="주소" required className="h-12" />
              <Input type="text" defaultValue={userExtraAddress} placeholder="참고항목" className="h-12" />
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
        <div className="flex flex-row gap-6 container items-center">
          <p className="w-32">배송 메시지</p>
          <div className="flex items-center w-full">
            <Input placeholder="ex) 배송 전 연락주세요." className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
