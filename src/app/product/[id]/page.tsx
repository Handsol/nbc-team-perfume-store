import Image from 'next/image';
import { getProductDetails } from '@/libs/api/product/product-api';
import ProductDetail from '@/components/product/product-detail';

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const details = await getProductDetails(params.id);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* 상단 섹션: 상품 정보 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 이미지 */}
        <div className="relative flex justify-center items-center bg-gray-900 rounded-lg p-6">
          <Image
            src={details.product_thumbnail}
            alt="향수 썸네일"
            width={400}
            height={400}
            className="rounded-lg shadow-lg object-contain z-10"
          />
        </div>

        {/* 상품 상세 정보 */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wide">{details.product_title}</h1>
            <p className="text-gray-500 mt-2 text-sm">{details.product_info}</p>
            <p className="text-2xl font-semibold mt-4">{details.product_price} 원</p>

            <div className="mt-6">
              <p className="text-sm text-gray-600">
                배송비: <span className="font-medium">무료</span>
              </p>
              <p className="text-sm text-gray-600">
                배송기간: <span className="font-medium">1~2일 (영업일 기준)</span>
              </p>
            </div>

            {/* 옵션 선택 */}
            <div className="mt-6">
              <p className="font-medium text-sm uppercase">옵션</p>
              <select className="w-full border border-gray-300 rounded-md p-2 mt-2 text-sm">
                <option>100ml</option>
              </select>
            </div>

            {/* 수량 선택 */}
            <div className="flex items-center mt-6">
              <p className="font-medium mr-4 text-sm uppercase">수량</p>
              <button className="border border-gray-300 px-3 py-1 text-lg">-</button>
              <span className="mx-4 text-lg font-semibold">1</span>
              <button className="border border-gray-300 px-3 py-1 text-lg">+</button>
            </div>

            <p className="text-xl font-bold mt-6">{details.product_price} 원</p>
          </div>

          {/* 버튼 */}
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full bg-black text-white py-3 rounded-md uppercase tracking-wide font-medium hover:bg-gray-800 transition">
              장바구니
            </button>
            <button className="w-full bg-gray-800 text-white py-3 rounded-md uppercase tracking-wide font-medium hover:bg-black transition">
              바로 구매
            </button>
          </div>
        </div>
      </div>

      {/* 태그 목록 */}
      <div className="mt-8 flex flex-wrap gap-2 border-t pt-6 mb-8 bg-gray-300">
        {details.product_tags.split(',').map((tag: string, index: number) => (
          <span key={index} className="px-4 py-1 text-sm bg-gray-300 text-gray-600 rounded-full uppercase">
            # {tag.trim()}
          </span>
        ))}
      </div>

      {/* 하단 섹션: 상세 페이지 박스 */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 uppercase tracking-wide">상세 정보</h2>
        <ProductDetail productDetailContent={details.products_photos} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
