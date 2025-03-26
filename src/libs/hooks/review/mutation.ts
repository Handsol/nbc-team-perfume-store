'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadReview, deleteReviews } from '@/libs/api/product/review-api';

export const useUploadReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      userId,
      content,
      rating
    }: {
      productId: string;
      userId: string;
      content: string;
      rating: number;
    }) =>
      uploadReview({
        product_id: productId,
        user_id: userId,
        review_content: content,
        review_rating: rating
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    }
  });
};

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, userId }: { productId: string; reviewId: string; userId: string }) =>
      deleteReviews({ review_id: reviewId, user_id: userId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
    }
  });
};
