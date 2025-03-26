'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // 최근 검색어 불러오기
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // 검색 실행 및 최근 검색어 저장
  const handleSearch = () => {
    if (query.trim() !== '') {
      const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5); // 최대 5개 유지
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      router.push(`search?query=${query}`);
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowDropdown(false);
    }
  };

  // 최근 검색어 삭제
  const removeSearchItem = (search: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <div className="relative w-[500px]">
      <div className="flex flex-row  h-[50px] border-b border-black">
        <input
          className="w-full px-4 outline-none"
          placeholder="오롯이 당신만의 향을 찾아보세요!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button onClick={handleSearch} className="px-4">
          <Image src={'/search-button.png'} alt="search" width={30} height={30} />
        </button>
      </div>

      {showDropdown && recentSearches.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-50">
          {recentSearches.map((search, index) => (
            <li key={index} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <span
                onMouseDown={() => {
                  setQuery(search);
                  handleSearch();
                }}
              >
                {search}
              </span>
              <button onMouseDown={() => removeSearchItem(search)} className="text-gray-500 hover:text-red-500 text-sm">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
