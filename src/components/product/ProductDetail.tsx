import Image from 'next/image';

interface ProductDetailProps {
  productDetailContent: { product_img_path: string }[];
}

const ProductDetail = ({ productDetailContent }: ProductDetailProps) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      {productDetailContent.map((photo, idx) => (
        <div key={idx} className="mb-6 flex justify-center">
          <Image
            src={photo.product_img_path}
            alt="제품 상세 페이지"
            width={600}
            height={400}
            style={{ width: 'auto', height: 'auto' }}
            className="rounded-lg shadow-md object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
