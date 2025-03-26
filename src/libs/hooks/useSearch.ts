import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useSearch = () => {
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

  return {
    query,
    setQuery,
    recentSearches,
    showDropdown,
    setShowDropdown,
    handleSearch,
    handleKeyDown,
    removeSearchItem
  };
};
