'use client';

import {
  deleteCartItem,
  updateCartItemQuantity,
  addCartItem,
  deleteAllCart,
  toggleCartItemChecked
} from '@/libs/api/cart/cart-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: (data) => {
      console.log(data);
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

export const useToggleChecked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCartItemChecked,
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
