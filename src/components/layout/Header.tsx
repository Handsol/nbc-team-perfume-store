import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';

const Header = () => {
  return (
    <div className="flex flex-col items-center w-full border-b border-lightgray">
      <div className="flex flex-row w-full max-w-[1400px] h-[100px] justify-between items-center px-4">
        <Link href={'/'}>
          <Image src={'/orot-logo.png'} alt="orot logo" width={150} height={0} />
        </Link>

        {/* 검색창 */}
        <div className="flex flex-1 justify-center px-10">
          <div className="w-full max-w-[700px]">
            <Search />
          </div>
        </div>

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
