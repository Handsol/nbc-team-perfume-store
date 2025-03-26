'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Products } from '@/types/products';
import { useAuthStore } from '@/zustand/authStore';
import { useAddCartItem } from '@/libs/hooks/cart/mutations';

const ProductSelector = ({ product_price, product_id }: Pick<Products, 'product_price' | 'product_id'>) => {
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState<number>(1);

  //뮤테이션 호출
  const { mutate: addCartItem } = useAddCartItem();

  const handleAddCard = () => {
    addCartItem({ product_id, cart_quantity: quantity, user_id: user!.id });
  };

  return (
    <div>
      {/* 옵션 선택 */}
      <div className="mt-4">
        <p className="font-medium text-sm uppercase text-gray-700">옵션</p>
        <select className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
          <option>100ml</option>
        </select>
      </div>

      {/* 수량 선택 */}
      <div className="flex items-center mt-4">
        <p className="font-medium mr-4 text-sm uppercase text-gray-700">수량</p>
        <Button
          onClick={() => setQuantity(quantity === 1 ? quantity : quantity - 1)}
          className="border border-gray-300 px-3 py-1 text-lg  hover:bg-gray-100"
        >
          -
        </Button>
        <span className="mx-4 text-lg font-semibold text-gray-900">{quantity}</span>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          className="border border-gray-300 px-3 py-1 text-lg  hover:bg-gray-100"
        >
          +
        </Button>
      </div>

      {/* 총 가격 */}
      <div className="mt-4">
        <p className="font-medium text-sm uppercase text-gray-700">판매가</p>
        <p className="text-xl font-semibold text-gray-900 mt-1">{(product_price * quantity).toLocaleString()} 원</p>
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={handleAddCard}
          className="w-full bg-black text-white py-3 rounded-md uppercase tracking-wider font-medium hover:bg-gray-800 transition"
        >
          장바구니
        </Button>
        <Button className="w-full bg-black text-white py-3 rounded-md uppercase tracking-wider font-medium hover:bg-gray-800 transition">
          바로 구매
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
