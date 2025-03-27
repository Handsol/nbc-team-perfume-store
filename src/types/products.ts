export interface Products {
  product_id: string;
  user_id: string;
  product_title: string;
  product_info: string;
  product_price: number;
  product_tags: string;
  created_at: string;
  product_category: string;
  product_thumbnail: string;
  product_brand: string;
}

export interface ProductDetails extends Omit<Products, 'user_id'> {
  products_photos: { product_img_path: string }[];
}

export interface ProductListProps {
  products: Products[];
}
