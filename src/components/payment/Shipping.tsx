'use client';
import { TAddress } from '@/types/shipping';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

const Shipping = () => {
  const [userFullAddress, setFullAddress] = useState('');
  const [userZoneCode, setZoneCode] = useState('');
  const [userExtraAddress, setExtraAddress] = useState('');
  const [userDetailAddress,setUserDetailAddress] =useState('')
  const postcodeScriptUrl = 'http://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data:TAddress) => {
    console.log(data);
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
    setFullAddress(fullAddress);
    setZoneCode(zoneCode);
    setExtraAddress(extraAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
    <label>

      <input type="text" defaultValue={userZoneCode} placeholder='우편번호' required />
      <button type="button" onClick={handleClick}>
        우편번호 검색
   
      </button>
    </label>
      <input type="text" defaultValue={userFullAddress} placeholder="주소" required />
      <input type="text" value={userDetailAddress} onChange={(e)=>setUserDetailAddress(e.target.value)} placeholder="상세 주소" required />
      <input type="text" defaultValue={userExtraAddress} placeholder="참고항목" required />
    </>
  );
};

export default Shipping;
