import Image from 'next/image';
import { getProductDetails } from '@/libs/api/product/product-api';
import ProductDetail from '@/components/product/ProductDetail';
import ReviewForm from '@/components/product/ReviewForm';
import ReviewList from '@/components/product/ReviewList';
import ProductSelector from '@/components/product/ProductSelector';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const details = await getProductDetails(params.id);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      {/* 상단 섹션: 상품 정보 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 이미지 */}
        <div className="flex justify-center items-center bg-black rounded-lg p-4">
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
            <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900">{details.product_brand}</h1>
            {/* 상품 정보 */}
            <p className="text-gray-600 mt-2 text-sm">{details.product_title}</p>
            <p className="text-gray-600 mt-2 text-sm">{details.product_info}</p>
            {/* 가격 */}
            <p className="text-gray-600 mt-2 text-sm">{details.product_price.toLocaleString()} 원</p>

            {/* 배송 정보 */}
            <div className="mt-4 text-sm text-gray-600">
              <p>
                배송비: <span className="font-medium">무료</span>
              </p>
              <p>
                배송기간: <span className="font-medium">1~2일 (영업일 기준)</span>
              </p>
            </div>
            <ProductSelector product_price={details.product_price} product_id={details.product_id} />
          </div>
        </div>
      </div>

      {/* 태그 목록 */}
      <div className="mt-8 flex flex-wrap gap-2 border-t pt-6 mb-8 bg-gray-100 rounded-lg p-4">
        {details.product_tags.split(',').map((tag: string, index: number) => (
          <span key={index} className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full uppercase">
            # {tag.trim()}
          </span>
        ))}
      </div>

      {/* 하단 섹션: 상세 페이지 박스 */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 uppercase tracking-wider text-gray-900">상세 정보</h2>
        <ProductDetail productDetailContent={details.products_photos} />
      </div>

      {/*리뷰 영역*/}
      <div>
        <ReviewForm productId={params.id} />
        <ReviewList productId={params.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
