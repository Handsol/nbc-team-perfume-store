import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-lightgray py-10">
      <p className="text-gray-500 mb-4 text-lg">장바구니가 비어 있습니다.</p>
      <Link
        href="/products"
        className={buttonVariants({ variant: 'default' })}
      >
        쇼핑하러 가기
      </Link>
    </div>
  );
};

export default EmptyCart;
