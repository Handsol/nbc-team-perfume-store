import { Products } from '@/types/products';

export const filterByCategory = (products: Products[], categories: readonly string[]): Products[] => {
  return products
    .filter((p) => categories.includes(p.product_category))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
};
