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
    }
  });

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="flex flex-col gap-2"
      >
        {/* 리뷰 사진
        <input type="file" onChange={handleSubmit} /> */}
        {/*리뷰 내용*/}
        <input
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="리뷰를 입력하세요"
          required
          className="border p-2"
        />
        {/*별점*/}
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
          className="border p-2"
        />
        <Button type="submit" disabled={!user} className="bg-blue-500 text-white p-2">
          리뷰 작성
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
