import { getCartItemList } from '@/libs/api/cart/api';
import { CartItem } from '@/types/cartItems';
import { useQuery } from '@tanstack/react-query';

export const useGetCartItems = (userId: CartItem['userId']) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartItemList(userId),
    enabled: !!userId
  });
};
