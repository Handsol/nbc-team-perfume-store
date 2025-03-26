'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== '') {
      router.push(`search?query=${query}`);
    }
  };

  return (
    <div>
      <div className="flex flex-row  h-[50px] border-b border-black">
        <input
          className="w-full px-4 outline-none"
          placeholder="오롯이 당신만의 향을 찾아보세요!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <Image src={'/search-button.png'} alt="search" width={30} height={0} />
        </button>
      </div>
    </div>
  );
};

export default Search;
