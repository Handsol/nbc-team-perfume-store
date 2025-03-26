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
  const handleSearch = (searchQuery?: string) => {
    const searchValue = searchQuery || query;
    if (searchValue.trim() !== '') {
      const updatedSearches = [searchValue, ...recentSearches.filter((item) => item !== searchValue)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      router.push(`/search?query=${searchValue}`);
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
      <div className="flex h-[50px] flex-row border-b border-black">
        <input
          className="w-full px-4 outline-none"
          placeholder="오롯이 당신만의 향을 찾아보세요!"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <button onClick={() => handleSearch()} className="px-4">
          <Image src={'/search-button.png'} alt="search" width={30} height={30} />
        </button>
      </div>

      {showDropdown && recentSearches.length > 0 && (
        <ul className="border-gray-300 absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="hover:bg-gray-100 flex cursor-pointer items-center justify-between px-4 py-2"
              onClick={() => {
                setQuery(search);
                handleSearch(search);
              }}
            >
              <span>{search}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 삭제 버튼 클릭 시 검색 실행 방지
                  removeSearchItem(search);
                }}
                className="text-gray-500 text-sm hover:text-red-500"
              >
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
