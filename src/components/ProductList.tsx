import { Products } from '@/types/products';

interface ProductListProps {
  products: Products[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.product_id}>
          <h2>{product.product_title}</h2>
          <p>{product.product_price}원</p>
        </div>
      ))}
    </div>
  );
}
