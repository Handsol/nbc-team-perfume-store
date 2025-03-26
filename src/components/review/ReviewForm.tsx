'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useUploadReviewMutation } from '@/libs/hooks/review/mutation';

interface ReviewFormProps {
  productId: string;
  user: { id: string } | null;
}

const ReviewForm = ({ productId, user }: ReviewFormProps) => {
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [starRating, setStarRating] = useState<number>(0);
  const { mutate } = useUploadReviewMutation();

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      mutate(
        { productId, userId: user.id, content, rating },
        {
          onSuccess: () => {
            setContent('');
            setRating(0);
            setStarRating(0);
          }
        }
      );
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="리뷰를 입력하세요"
          required
          className="border-gray-300 text-gray-700 focus:ring-gray-400 h-24 resize-none rounded-lg border p-3 text-sm focus:outline-none focus:ring-2"
        />
        {/* 별점 입력 */}
        <div className="flex items-center">
          <span className="text-gray-700 mr-2 text-sm">별점:</span>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                type="button"
                key={starValue}
                onClick={() => handleRatingClick(starValue)}
                onMouseEnter={() => handleRatingHover(starValue)}
                onMouseLeave={handleRatingLeave}
                className={'m-0 p-0 text-2xl text-yellow-500 focus:outline-none'}
              >
                {starValue <= (starRating || rating) ? '★' : '☆'}
              </button>
            );
          })}
        </div>
        <Button
          type="submit"
          disabled={!user}
          className="hover:bg-gray-800 disabled:bg-gray-400 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed"
        >
          리뷰 작성
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
