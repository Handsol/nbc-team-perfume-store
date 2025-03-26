'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/zustand/authStore';
import { deleteReviews, getReviews } from '@/libs/api/product/review-api';
import { Button } from '../ui/button';
import { calDate } from '@/utils/calDate';

const ReviewList = ({ productId }: { productId: string }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: reviews,
    isLoading,
    error
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId)
  });

  const deleteMutation = useMutation({
    mutationFn: ({ reviewId, userId }: { reviewId: string; userId: string }) =>
      deleteReviews({ review_id: reviewId, user_id: userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    }
  });

  if (isLoading) return <p className="text-center text-gray-500">리뷰 로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">에러 발생: {error.message}</p>;

  return (
    <div className="space-y-4">
      {reviews?.map((review) => (
        <div key={review.review_id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
          <p className="text-sm font-semibold text-gray-800">{review.users.user_nickname}</p>
          <p className="text-sm text-yellow-500">
            {'★'.repeat(review.review_rating)}
            {'☆'.repeat(5 - review.review_rating)}
          </p>
          <p className="text-xs text-gray-500">{calDate(review.created_at)}</p>
          <p className="text-sm text-gray-700 mt-2">{review.review_content}</p>
          {user?.id === review.user_id && (
            <div className="mt-3">
              <Button
                onClick={() => deleteMutation.mutate({ reviewId: review.review_id, userId: user!.id })}
                className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition"
              >
                리뷰 삭제 하기
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
