import useCartStore from '@/zustand/cart-store';
import CartItem from '@/components/cart/CartItem';

const OrderItems = () => {
  const selectedItems = useCartStore((state) => state.selectedItems);

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl">주문상품</h2>
      <div className="flex flex-col justify-start gap-6 px-8 py-6">
      {selectedItems.map((item) => {
        return <CartItem item={item} fixed={true} key={item.cart_id}/>;
      })}
      </div>
    </div>
  );
};

export default OrderItems;
