import { useDeleteCartItem, useToggleChecked, useUpdateItemQuantity } from '@/libs/hooks/cart/mutations';
import { TCartItem } from '@/types/cart-items';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  item: TCartItem;
  fixed: boolean;
};

const CartItem = ({ item, fixed }: Props) => {
  const { products } = item;
  let total = products.product_price * item.cart_quantity;

  //장바구니 체크 토글 mutation
  const { mutate: toggleCheck } = useToggleChecked();

  //카트 수량 업데이트 mutation
  const { mutate: updateItemQuantity } = useUpdateItemQuantity();
  //아이템 수량 변경
  const handleQuantity = (cartId: TCartItem['cart_id'], currentQuantity: number, add: boolean) => {
    let updatedQuantity = add ? currentQuantity + 1 : currentQuantity - 1;
    updateItemQuantity({ cartId, quantity: updatedQuantity });
  };

  //카트 삭제 mutation
  const { mutate: deleteCartItem } = useDeleteCartItem();
  //아이템 삭제
  const handleDeleteItem = (cartId: TCartItem['cart_id']) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      deleteCartItem(cartId);
    }
  };

  return (
    <li className="relative mb-6 flex flex-wrap items-start justify-between bg-lightgray px-4 py-8" key={item.cart_id}>
      {fixed ? (
        <></>
      ) : (
        <Checkbox
          checked={item.cart_checked}
          onCheckedChange={() => toggleCheck({ cartId: item.cart_id, checked: item.cart_checked })}
          className="mr-4 flex items-start"
        />
      )}

      <div className="mr-4">
        <Image src={products.product_thumbnail} alt={products.product_title} width={200} height={100} />
      </div>
      <div className="min-h-10 mr-4 mt-4 flex w-96 flex-col justify-between">
        <div className="mb-8">
          <h2 className="mb-4 font-bold">{products.product_brand}</h2>
          <h3>{products.product_title}</h3>
        </div>
      </div>
      {fixed ? (
        <>
          <div className="border-box h-9 w-16 text-center leading-8">수량: {item.cart_quantity}</div>
        </>
      ) : (
        <>
          <div className="mx-4 flex w-32 flex-col pt-10">
            <div className="mb-2 text-2xl font-bold text-black">
              {total.toLocaleString()} <span className="text-base font-normal">원</span>
            </div>
            <div className="flex">
              <button
                className="border-box h-9 w-9 border-2"
                onClick={() => handleQuantity(item.cart_id, item.cart_quantity, false)}
              >
                -
              </button>
              <div className="border-box h-9 w-16 border-2 text-center leading-8">{item.cart_quantity}</div>
              <button
                className="border-box h-9 w-9 border-2"
                onClick={() => handleQuantity(item.cart_id, item.cart_quantity, true)}
              >
                +
              </button>
            </div>
          </div>
          <div className="mx-4 pt-16">
            <button onClick={() => handleDeleteItem(item.cart_id)} className="border-2 p-2">
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default CartItem;
