import type { Products } from './products';

//제품 타입을 상속받아 확장하여 CartItem 선언
export interface TCartItem extends Products {
  cart_id: string;
  product_id: Products['product_id'];
  cart_quantity: number;
  user_id: string;
  products: Products;
  cart_checked: boolean;
}

// 장바구니 추가시 필요한 타입
export type AddCartData = Pick<TCartItem, 'product_id' | 'cart_quantity' | 'user_id'>;
