'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/zustand/authStore';
import { Button } from '../ui/button';
import { uploadReview } from '@/libs/api/product/review-api';

const ReviewForm = ({ productId }: { productId: string }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [starRating, setStarRating] = useState<number>(0);

  const mutation = useMutation({
    mutationFn: () =>
      uploadReview({
        product_id: productId,
        user_id: user!.id,
        review_content: content,
        review_rating: rating
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      setContent('');
      setRating(0);
      setStarRating(0);
    }
  });

  // 별점 클릭 핸들러
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  // 별점 호버 핸들러
  const handleRatingHover = (value: number) => {
    setStarRating(value);
  };

  // 호버 해제 핸들러
  const handleRatingLeave = () => {
    setStarRating(0);
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="flex flex-col gap-4"
      >
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="리뷰를 입력하세요"
          required
          className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none h-24"
        />
        {/* 별점 입력 */}
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">별점:</span>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => handleRatingClick(starValue)}
                onMouseEnter={() => handleRatingHover(starValue)}
                onMouseLeave={handleRatingLeave}
                className={'text-2xl p-0 m-0 text-yellow-500 focus:outline-none'}
              >
                {starValue <= (starRating || rating) ? '★' : '☆'}
              </button>
            );
          })}
        </div>
        <Button
          type="submit"
          disabled={!user}
          className="bg-black text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          리뷰 작성
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
