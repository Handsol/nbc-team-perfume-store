import type { Products } from './products';
//제품 타입을 상속받아 확장하여 CartItem 선언
export interface CartItem extends Products {
  quantity: number;
}

export interface PostCartData {
  product_id: Products['id'];
  cart_quantity: number;
  user_id: string; //현재 로그인한 유저의 아이디 
}
