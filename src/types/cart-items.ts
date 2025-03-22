import type { Products } from './products';

//제품 타입을 상속받아 확장하여 CartItem 선언
export interface CartItem extends Products {
  cartId: string;
  // created_at: string;
  productId: Products['id'];
  quantity: number;
  userId: string;
}

// 장바구니 추가시 필요한 타입
export type AddCartData = Pick<CartItem, 'productId' | 'quantity' | 'userId'>;
