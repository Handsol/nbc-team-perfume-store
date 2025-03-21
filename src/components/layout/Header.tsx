import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center px-[250px] w-full h-[100px] ">
        <Link href={'/'}>
          <Image src={'/orot-logo.png'} alt="orot logo" width={150} height={0} />
        </Link>
        <div className="flex flex-row gap-1">
          <Link href={'/login'}>
            <Image src={'/login-button.png'} alt="login" width={80} height={0} />
          </Link>
          <Link href={'/my-page'}>
            <Image src={'/mypage-button.png'} alt="login" width={80} height={0} />
          </Link>
          <Link href={'/mycart-page'}>
            <Image src={'/mycart-button.png'} alt="login" width={80} height={0} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
