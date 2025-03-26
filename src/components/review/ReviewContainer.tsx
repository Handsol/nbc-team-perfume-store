'use client';
import { useAuthStore } from '@/zustand/authStore';
import ReviewForm from '@/components/review/ReviewForm';
import ReviewList from '@/components/review/ReviewList';

const ReviewContainer = ({ paramsId }: { paramsId: string }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <ReviewForm productId={paramsId} user={user} />
      <ReviewList productId={paramsId} user={user} />
    </div>
  );
};

export default ReviewContainer;
