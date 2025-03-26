'use client';

import { useQuery } from '@tanstack/react-query';
import { getReviews } from '@/libs/api/product/review-api';
import { useDeleteReviewMutation } from '@/libs/hooks/review/mutation';
import { calDate } from '@/utils/calDate';
import { Button } from '../ui/button';

interface ReviewFormProps {
  productId: string;
  user: { id: string } | null;
}

const ReviewList = ({ productId, user }: ReviewFormProps) => {
  const {
    data: reviews,
    isLoading,
    error
  } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId)
  });

  const { mutate: deleteReview } = useDeleteReviewMutation();

  if (isLoading) return <p className="text-gray-500 text-center">리뷰 로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">에러 발생: {error.message}</p>;

  return (
    <div className="space-y-4">
      {reviews?.map((review) => (
        <div key={review.review_id} className="border-gray-300 rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-gray-800 text-sm font-semibold">{review.users.user_nickname}</p>
          <p className="text-sm text-yellow-500">
            {'★'.repeat(review.review_rating)}
            {'☆'.repeat(5 - review.review_rating)}
          </p>
          <p className="text-gray-500 text-xs">{calDate(review.created_at)}</p>
          <p className="text-gray-700 mt-2 text-sm">{review.review_content}</p>
          {user?.id === review.user_id && (
            <div className="mt-3">
              <Button
                onClick={() => deleteReview({ productId: productId, reviewId: review.review_id, userId: user!.id })}
                className="hover:bg-gray-800 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition"
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
