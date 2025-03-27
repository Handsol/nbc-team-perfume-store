'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAddCartItem } from '@/libs/hooks/cart/mutations';
import { useAuthStore } from '@/zustand/authStore';
import useCartStore from '@/zustand/cart-store';
import { Products } from '@/types/products';
import { TCartItem } from '@/types/cart-items';
import { calculateTotal } from '@/utils/purchase';
import { Button } from '../ui/button';

type Props = Pick<Products, 'product_price' | 'product_id' | 'product_brand' | 'product_thumbnail' | 'product_title'>;

const ProductSelector = ({ product_price, product_id, product_brand, product_thumbnail, product_title }: Props) => {
  const { user } = useAuthStore();
  const cartStatus = useCartStore((state) => state);
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);

  //뮤테이션 호출
  const { mutate: addCartItem } = useAddCartItem();

  const handleAddCard = () => {
    addCartItem({ product_id, cart_quantity: quantity, user_id: user!.id });
  };

  const handleBuyNow = () => {
    const selectedItem = {
      product_id,
      cart_quantity: quantity,
      cart_checked: true,
      products: { product_price, product_thumbnail, product_brand, product_title }
    } as TCartItem;

    const { total, checkedList } = calculateTotal([selectedItem]); // 리스트로 변환

    cartStatus.setSelectedItems(checkedList);
    cartStatus.setSelectedTotal(total);

    router.push('/payment');
  };

  return (
    <div>
      {/* 옵션 선택 */}
      <div className="mt-4">
        <p className="text-gray-700 text-sm font-medium uppercase">옵션</p>
        <select className="border-gray-300 text-gray-700 focus:ring-gray-400 mt-1 w-full rounded-md border p-2 text-sm focus:outline-none focus:ring-2">
          <option>100ml</option>
        </select>
      </div>

      {/* 수량 선택 */}
      <div className="mt-4 flex items-center">
        <p className="text-gray-700 mr-4 text-sm font-medium uppercase">수량</p>
        <Button
          onClick={() => setQuantity(quantity === 1 ? quantity : quantity - 1)}
          className="border-gray-300 hover:bg-gray-100 border px-3 py-1 text-lg"
        >
          -
        </Button>
        <span className="text-gray-900 mx-4 text-lg font-semibold">{quantity}</span>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          className="border-gray-300 hover:bg-gray-100 border px-3 py-1 text-lg"
        >
          +
        </Button>
      </div>

      {/* 총 가격 */}
      <div className="mt-4">
        <p className="text-gray-700 text-sm font-medium uppercase">판매가</p>
        <p className="text-gray-900 mt-1 text-xl font-semibold">{(product_price * quantity).toLocaleString()} 원</p>
      </div>

      {/* 버튼 */}
      <div className="mt-6 flex flex-col gap-3">
        <Button
          onClick={handleAddCard}
          className="hover:bg-gray-800 w-full rounded-md bg-black py-3 font-medium uppercase tracking-wider text-white transition"
        >
          장바구니
        </Button>
        <Button
          onClick={handleBuyNow}
          className="hover:bg-gray-800 w-full rounded-md bg-black py-3 font-medium uppercase tracking-wider text-white transition"
        >
          바로 구매
        </Button>
      </div>
    </div>
  );
};

export default ProductSelector;
