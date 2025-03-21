import type { Products } from './products';
//제품 타입을 상속받아 확장하여 CartItem 선언 
interface CartItem extends Products {
  quantity: number;
}
