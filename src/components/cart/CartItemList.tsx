import { useGetCartItems } from '@/libs/hooks/cart/queries';
import CartItem from './CartItem';
import { TCartItem } from '@/types/cart-items';
import EmptyCart from './EmptyCart';
import CartPriceWrapper from './CartPriceWrapper';
import Loading from '@/app/loading';

type CartItemListProps = {
  user_id: TCartItem['user_id'];
};

const CartItemList = ({ user_id }: CartItemListProps) => {
  //카트 리스트 불러오기
  const { data: cartItemList, isPending, isError } = useGetCartItems(user_id);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요</div>;
  }

  return (
    <div className="relative mt-10 flex flex-col items-start justify-center gap-8 xl:flex-row">
      <ul className="w-full grow">
        {cartItemList && cartItemList.length > 0 ? (
          cartItemList.map((item) => <CartItem key={item.cart_id} item={item} fixed={false} />)
        ) : (
          <EmptyCart />
        )}
      </ul>
      <CartPriceWrapper cartItemList={cartItemList} />
    </div>
  );
};

export default CartItemList;
