import { useRouter } from 'next/navigation';

export const useCart = () => {
  const router = useRouter();

  const goToCartPage = () => {
    router.push('/cart');
  };

  return {
    goToCartPage
  };
};
