'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/sign-up' || pathname === '/login' || pathname === '/my-page') {
    return null;
  }

  {
    /* 카테고리 필터링 함수 : 버튼 클릭 시 URL 업데이트*/
  }
  const handleFilterChange = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category); // 'category' 키에 값 설정
    router.push(`/products?${params.toString()}`);
  };
  // UI 표시 이름이랑 DB 카테고리 ㅇ매핑
  const CategorySuffix = {
    '오 드 뚜왈렛': 'EDT',
    '오 드 퍼퓸': 'EDP',
    코롱: 'EDC',
    헤어퍼퓸: 'HP'
  };

  return (
    <div className="flex w-full border-b border-lightgray">
      <div className="mx-auto flex h-[50px] w-full max-w-[1000px] divide-x divide-[#d3d3d3]">
        {/* 남성용 */}
        <div className="flex min-w-0 flex-1 flex-row items-center gap-5 px-4">
          <button className="whitespace-nowrap font-semibold text-black" onClick={() => handleFilterChange('man')}>
            For Man
          </button>
          {/* 하위 카테고리 버튼들: man + CategorySuffix로 필터링 */}
          <div className="text-l flex min-w-0 shrink flex-wrap gap-6 text-gray">
            {Object.entries(CategorySuffix).map(([category, suffix]) => (
              <button key={category} onClick={() => handleFilterChange(`man${suffix}`)}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 여성용 */}
        <div className="flex min-w-0 flex-1 flex-row items-center gap-5 px-4">
          <button className="whitespace-nowrap font-semibold text-black" onClick={() => handleFilterChange('woman')}>
            For Woman
          </button>
          {/* 하위 카테고리 버튼들: woman + CategorySuffix로 필터링 */}
          <div className="text-l flex min-w-0 shrink flex-wrap gap-6 text-gray">
            {Object.entries(CategorySuffix).map(([category, suffix]) => (
              <button key={category} onClick={() => handleFilterChange(`woman${suffix}`)}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
