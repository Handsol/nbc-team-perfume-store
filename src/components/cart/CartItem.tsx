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
    <li className="relative flex flex-wrap py-8 px-4 mb-6 items-start justify-between bg-lightgray" key={item.cart_id}>
      <Checkbox
        onCheckedChange={() => toggleCheck({ cartId: item.cart_id, checked: !item.cart_checked })}
        className="flex items-start mr-4"
      />
  
      <div className="mr-4">
        <Image src={products.product_thumbnail} alt={products.product_title} width={200} height={100} />
      </div>
      <div className="flex flex-col min-h-10 w-96 mr-4 mt-4 justify-between">
        <div className="mb-8">
          <h2 className="font-bold mb-4 ">{products.product_brand}</h2>
          <h3>{products.product_title}</h3>
        </div>
      </div>
      {fixed ? (
        <></>
      ) : (
        <>
          <div className="flex flex-col w-32 mx-4 pt-10">
            <div className="text-2xl font-bold mb-2 text-black">
              {total.toLocaleString()} <span className="text-base font-normal">원</span>
            </div>
            <div className="flex">
              <button
                className="border-2 border-box w-9 h-9 "
                onClick={() => handleQuantity(item.cart_id, item.cart_quantity, false)}
              >
                -
              </button>
              <div className="text-center border-2 border-box w-16 h-9 leading-8">{item.cart_quantity}</div>
              <button
                className="border-2 border-box w-9 h-9"
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
