import Image from 'next/image';

// fill? 은 이미지 삽입 시 fill 속성이 있는지 확인하고,
// fill이 true라면 width와 height 속성을 제거합니다.

interface ImagePlaceholderProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
}

const ImagePlaceholder = ({
  src,
  alt = 'image',
  width,
  height,
  className = '',
  fill = false
}: ImagePlaceholderProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      placeholder="empty"
    />
  );
};

export default ImagePlaceholder;
