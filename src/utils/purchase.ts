import { TCartItem } from '@/types/cart-items';

// 결제금액 계산 함수
export const calculateTotal = (cartItemList: TCartItem[]) => {
  const checkedList = cartItemList.filter((cart) => cart.cart_checked);

  let total = checkedList.reduce((cur, item) => {
    return cur + item.products.product_price * item.cart_quantity;
  }, 0);

  const shippingPay = total === 0 ? 0: total > 50000 ? 0 : 3000; //배송비
  if (total < 50000) {
    total += shippingPay;
  }
  return { total, shippingPay, checkedList };
};

export const setStatus = (cartItemList: TCartItem[], cartStatus: any) => {
  const { total, checkedList } = calculateTotal(cartItemList);

  // 체크된 제품 상태저장
  cartStatus.setSelectedItems(checkedList);
  // 총금액 상태저장
  cartStatus.setSelectedTotal(total);
};