import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getProducts } from '@/libs/api/product/product-api';
import Image from 'next/image';

const CarouselSection = async () => {
  // 최신 등록순으로 제품 5개의 정보만 가져오기
  const allProducts = await getProducts();
  const products = allProducts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div>
      {' '}
      <div className="w-full h-[600px]">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.product_id}>
                <div className="relative w-full h-[600px] overflow-hidden">
                  {/* 배경 이미지 */}
                  <Image src={product.product_thumbnail} alt="blur-bg" fill className="object-cover blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />
                  <div className="relative z-10 flex flex-row justify-center items-center w-full h-full px-8 text-white">
                    {/* 텍스트 (브랜드, 제품명) */}
                    <div className="flex flex-col justify-start text-left mr-12 gap-10 max-w-md">
                      <h2 className="text-6xl font-bold">{product.product_brand}</h2>
                      <p className="text-2xl mt-2">{product.product_title}</p>
                    </div>

                    {/* 제품 썸네일 */}
                    <Image
                      src={product.product_thumbnail}
                      alt={product.product_title}
                      width={600}
                      height={600}
                      className="h-[600px] object-contain"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-black w-10 h-10" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:bg-black w-10 h-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSection;
