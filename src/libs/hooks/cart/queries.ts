import { getCartItemList } from '@/libs/api/cart/cart-api';
import { CartItem } from '@/types/cart-items';
import { useQuery } from '@tanstack/react-query';

export const useGetCartItems = (userId: CartItem['user_id']) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItemList(userId),
    enabled: !!userId
  });
};
