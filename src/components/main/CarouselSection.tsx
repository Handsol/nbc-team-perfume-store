import Link from 'next/link';
import { getAllProducts } from '@/libs/api/product/product-api';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ImagePlaceholder from '../ui/ImagePlaceholder';

const CarouselSection = async () => {
  // 최신 등록순으로 제품 5개의 정보만 가져오기
  const allProducts = await getAllProducts();
  const products = allProducts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="h-[600px] w-full">
      <Carousel className="h-full w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.product_id}>
              <Link href={`/products/${product.product_id}`} className="block">
                <div className="relative h-[600px] w-full overflow-hidden">
                  {/* 배경 이미지 */}
                  <ImagePlaceholder
                    src={product.product_thumbnail}
                    alt="blur-bg"
                    fill
                    className="object-cover blur-sm"
                  />
                  <div className="absolute left-0 top-0 z-0 h-full w-full bg-black/40" />
                  <div className="relative z-10 flex h-full w-full flex-row items-center justify-center px-8 text-white">
                    {/* 텍스트 (브랜드, 제품명) */}
                    <div className="mr-12 flex max-w-md flex-col justify-start gap-10 text-left">
                      <h2 className="text-6xl font-bold">{product.product_brand}</h2>
                      <p className="mt-2 text-2xl">{product.product_title}</p>
                    </div>

                    {/* 제품 썸네일 */}
                    <ImagePlaceholder
                      src={product.product_thumbnail}
                      alt={product.product_title}
                      width={600}
                      height={600}
                      className="h-[600px] object-contain"
                    />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 top-1/2 z-50 h-10 w-10 -translate-y-1/2 bg-black/50 text-white hover:bg-black" />
        <CarouselNext className="right-4 top-1/2 z-50 h-10 w-10 -translate-y-1/2 bg-black/50 text-white hover:bg-black" />
      </Carousel>
    </div>
  );
};

export default CarouselSection;
