import { deleteCartItem, updateCartItemQuantity, addCartItem, deleteAllCart } from '@/libs/api/cart/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });
};

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });
};

export const useDeleteAllCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      });
    }
  });
};

//낙관적 업데이트 반영 예정