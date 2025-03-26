import Image from 'next/image';

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
      placeholder="blur"
      blurDataURL={src}
    />
  );
};

export default ImagePlaceholder;
