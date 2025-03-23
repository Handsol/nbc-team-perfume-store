import { SupabaseClient } from '@supabase/supabase-js';
import { Products } from '@/types/products';

export const getProducts = async (supabase: SupabaseClient): Promise<Products[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    throw error;
  }
  return data as Products[];
};
