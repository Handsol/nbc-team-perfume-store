import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getProducts } from '@/libs/api/product/product-api';
import Image from 'next/image';

const HomePage = async () => {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="w-full h-[600px]">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.product_id}>
              <div className="relative w-full h-[600px] overflow-hidden">
                {/* 🔹 배경 블러 이미지 */}
                <Image src={product.product_thumbnail} alt="blur-bg" fill className="object-cover blur-sm" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />

                {/* 🔸 전경 콘텐츠 */}
                <div className="relative z-10 flex flex-row justify-center items-center w-full h-full px-8 text-white">
                  {/* 왼쪽 텍스트 영역 */}
                  <div className="flex flex-col justify-start text-left mr-12 gap-10 max-w-md">
                    <h2 className="text-6xl font-bold">{product.product_brand}</h2>
                    <p className="text-2xl mt-2">{product.product_title}</p>
                  </div>

                  {/* 오른쪽 썸네일 이미지 */}
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
      </Carousel>
    </div>
  );
};

export default HomePage;
