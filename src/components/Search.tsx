import Image from 'next/image';

const Search = () => {
  return (
    <div>
      <div className="flex flex-row  h-[50px] border-b border-black">
        <input className="w-full px-4 outline-none" placeholder="오롯이 당신만의 향을 찾아보세요!" />
        <button>
          <Image src={'/search-button.png'} alt="search" width={30} height={0} />
        </button>
      </div>
    </div>
  );
};

export default Search;
