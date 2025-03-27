'use client';

import Image from 'next/image';
import { useSearch } from '@/libs/hooks/useSearch';

const Search = () => {
  const {
    query,
    setQuery,
    recentSearches,
    showDropdown,
    setShowDropdown,
    handleSearch,
    handleKeyDown,
    removeSearchItem
  } = useSearch();

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
