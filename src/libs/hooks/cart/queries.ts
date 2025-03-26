import { getCartItemList } from '@/libs/api/cart/cart-api';
import { TCartItem } from '@/types/cart-items';
import { useQuery } from '@tanstack/react-query';

export const useGetCartItems = (userId: TCartItem['user_id']) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItemList(userId),
    enabled: !!userId,
  });
};
