import { getAllProducts } from '@/libs/api/product/product-api';
import { filterByCategory } from '@/utils/filterByCategory';
import Caroucel from '@/components/main/CarouselSection';
import ProductSection from '@/components/main/ProductSection';

const MAN_CATEGORIES = ['manEDT', 'manEDP', 'manEDC', 'manHP'] as const;
const WOMAN_CATEGORIES = ['womanEDT', 'womanEDP', 'womanEDC', 'womanHP'] as const;

const HomePage = async () => {
  const allProducts = await getAllProducts();

  const manProducts = filterByCategory(allProducts, MAN_CATEGORIES);
  const womanProducts = filterByCategory(allProducts, WOMAN_CATEGORIES);

  return (
    <div>
      <Caroucel />

      <ProductSection title="For Man" products={manProducts} />
      <ProductSection title="For Woman" products={womanProducts} />
    </div>
  );
};

export default HomePage;
