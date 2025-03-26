//주문상품 결제페이지 전달용 상태관리
import { create } from 'zustand';
import { TCartItem } from '../types/cart-items';

const initialState = {
  selectedItems: [] as TCartItem[],
  selectedTotal: 0
};
type TCartStore = {
  selectedItems: TCartItem[];
  selectedTotal: number;
  setSeletedItems: (cartItemList: TCartItem[]) => void;
  setSeletedTotal: (total: number) => void;
};
const useCartStore = create<TCartStore>()((set) => ({
  ...initialState,
  setSeletedItems: (cartItemList) => set({ selectedItems: cartItemList }),
  setSeletedTotal: (total) => set({ selectedTotal: total })
}));

export default useCartStore;
