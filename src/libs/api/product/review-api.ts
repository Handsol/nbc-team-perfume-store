'use server';

import { review } from '@/types/review';
import { getServerClient } from '@/utils/supabase/serverClient';

export const uploadReview = async ({
  product_id,
  user_id,
  review_content,
  review_rating
}: Omit<review, 'review_id'>) => {
  const supabase = getServerClient();
  const { error } = await supabase.from('reviews').insert([{ user_id, product_id, review_content, review_rating }]);
  if (error) throw new Error(error.message);

  return '리뷰가 성공적으로 업로드 되었습니다.';
};

export const getReviews = async (product_id: review['product_id']) => {
  const supabase = getServerClient();
  const { data, error } = await supabase.from('reviews').select('*').eq('product_id', product_id);
  if (error) throw error;
  return data;
};

export const deleteReviews = async ({ review_id, user_id }: Pick<review, 'review_id' | 'user_id'>) => {
  const supabase = getServerClient();
  const { error } = await supabase.from('reviews').delete().eq('review_id', review_id).eq('user_id', user_id);
  if (error) throw error;
  return;
};
