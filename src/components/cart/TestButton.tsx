'use client';

import { useAddCartItem } from '@/libs/hooks/cart/mutations';

const TestButton = () => {
  //장바구니 테스트용 변수
  const user_id = '6b25b700-0dff-4f94-8425-462fcfb74d5d';
  const product_id = '95ee7f2a-180a-4a0c-ae66-25af9e9e413b';

  //뮤테이션 호출
  const { mutate: addCartItem } = useAddCartItem();

  //카트 아이템 추가
  const handleAddCartItem = () => {
    const data = addCartItem({ product_id, cart_quantity: 2, user_id });
    console.log('data', data);
  };

  return (
    <div>
      <button onClick={handleAddCartItem} className="border-2 p-2">
        장바구니 아이템 추가
      </button>
    </div>
  );
};
export default TestButton;
