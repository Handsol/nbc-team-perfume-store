import Caroucel from '@/components/main/Caroucel';
import ProductSection from '@/components/main/ProductSection';
import { getProducts } from '@/libs/api/product/product-api';
import { filterByCategory } from '@/utils/filterByCategory';

const HomePage = async () => {
  const allProducts = await getProducts();
  const manProducts = filterByCategory(allProducts, ['manEDT', 'manEDP', 'manEDC', 'manHP']);
  const womanProducts = filterByCategory(allProducts, ['womanEDT', 'womanEDP', 'womanEDC', 'womanHP']);

  return (
    <div>
      <Caroucel />

      <ProductSection title="For Man" products={manProducts} />
      <ProductSection title="For Woman" products={womanProducts} />
    </div>
  );
};

export default HomePage;
