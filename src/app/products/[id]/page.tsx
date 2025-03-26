import Image from 'next/image';
import { getProductDetails } from '@/libs/api/product/product-api';
import ProductDetail from '@/components/product/ProductDetail';

import ProductSelector from '@/components/product/ProductSelector';
import ReviewContainer from '@/components/review/ReviewContainer';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const details = await getProductDetails(params.id);

  return (
    <div className="mx-auto max-w-5xl bg-white p-6">
      {/* 상단 섹션: 상품 정보 컨테이너 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 이미지 */}
        <div className="flex items-center justify-center rounded-lg bg-black p-4">
          <Image
            src={details.product_thumbnail}
            alt="향수 썸네일"
            width={400}
            height={400}
            style={{ width: 'auto', height: 'auto' }}
            className="rounded-lg object-contain"
          />
        </div>

        {/* 상품 상세 정보 */}
        <div className="flex flex-col justify-between">
          <div>
            {/* 상품 제목 */}
            <h1 className="text-gray-900 text-2xl font-bold uppercase tracking-wider">{details.product_brand}</h1>
            {/* 상품 정보 */}
            <p className="text-gray-600 mt-2 text-sm">{details.product_title}</p>
            <p className="text-gray-600 mt-2 text-sm">{details.product_info}</p>
            {/* 가격 */}
            <p className="text-gray-600 mt-2 text-sm">{details.product_price.toLocaleString()} 원</p>

            {/* 배송 정보 */}
            <div className="text-gray-600 mt-4 text-sm">
              <p>
                배송비: <span className="font-medium">무료</span>
              </p>
              <p>
                배송기간: <span className="font-medium">1~2일 (영업일 기준)</span>
              </p>
            </div>
            {/* 상품 장바구니, 구매 */}
            <ProductSelector
              product_price={details.product_price}
              product_id={details.product_id}
              product_brand={details.product_brand}
              product_thumbnail={details.product_thumbnail}
              product_title={details.product_title}
            />
          </div>
        </div>
      </div>

      {/* 태그 목록 */}
      <div className="bg-gray-100 mb-8 mt-8 flex flex-wrap gap-2 rounded-lg border-t p-4 pt-6">
        {details.product_tags.split(',').map((tag: string, index: number) => (
          <span key={index} className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs uppercase">
            # {tag.trim()}
          </span>
        ))}
      </div>

      {/* 하단 섹션: 상세 페이지 박스 */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <h2 className="text-gray-900 mb-4 text-xl font-semibold uppercase tracking-wider">상세 정보</h2>
        <ProductDetail productDetailContent={details.products_photos} />
      </div>

      {/*리뷰 영역*/}
      <ReviewContainer paramsId={params.id} />
    </div>
  );
};

export default ProductDetailPage;
