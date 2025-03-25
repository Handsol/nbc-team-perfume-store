'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/zustand/authStore';
import { deleteReviews, getReviews } from '@/libs/api/product/review-api';
import { Button } from '../ui/button';

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

  if (isLoading) return <p>리뷰 로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div>
      {reviews?.map((review) => (
        <div key={review.review_id} className="border p-2 mb-2">
          <p>{review.review_rating}</p>
          <p>{review.review_content}</p>
          {user?.id === review.user_id && (
            <Button onClick={() => deleteMutation.mutate({ reviewId: review.review_id, userId: user!.id })}>
              리뷰 삭제 하기
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
