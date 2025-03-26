'use client';
{
  /* 제가 이해하기 위해 주석이 좀 더러울 수 있습니다 pr 확인 후 전부 제거 하겠습니다 */
}
import { useSearchParams } from 'next/navigation';
import { PaginationControlsProps } from '@/types/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis
} from '@/components/ui/pagination';

const PaginationControls = ({ currentPage, totalPages, category }: PaginationControlsProps) => {
  const searchParams = useSearchParams();

  const createPageURL = (page: number) => {
    // 새 URL 생성
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString()); // 페이지 번호 설정
    if (category) params.set('category', category); // 카테고리가 있으면 추가
    return `/products?${params.toString()}`; // ex) /products?page=3&category=man
  };
  {
    /* 페이지 번호 버튼을 위한 계산 */
  }
  const renderPageNumbers = () => {
    const pages = []; // 페이지 번호 버튼 배열
    const maxVisiblePages = 5; // 최대 표시할 페이지 버튼 수( 1 | 2 | 3 | 4 | 5 | Next > )
    const half = Math.floor(maxVisiblePages / 2); // 최대 페이지 수의 절반 계산
    let start = Math.max(1, currentPage - half); // 시작 페이지 번호 : 현재 페이지에서 half(2)만큼 앞
    let end = Math.min(totalPages, start + maxVisiblePages - 1); // 끝 페이지 번호 : start에서 4 뒤

    // 표시할 페이지 수가 maxVisiblePages(5)보다 적을 경우 start 조정
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
      // ex) 마지막 페이지(7) - 버튼 개수(5) + 1 = 3
      // 보여주는 버튼의 시작을 3으로 바꿔 3 | 4 | 5 | 6 | 7 버튼 5개 유지
    }

    if (start > 1) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    // start부터 end까지 페이지 번호 버튼 생성
    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageURL(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (end < totalPages) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    return pages; // 버튼 배열 반환
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && ( // 현재 페이지가 1보다 크면 "이전" 버튼 표시
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} /> {/* 이전 페이지로 이동하는 버튼 */}
          </PaginationItem>
        )}
        {renderPageNumbers()} {/* 페이지 버튼들 렌더링 */}
        {currentPage < totalPages && ( // 현재 페이지가 마지막이 아니면 "다음" 버튼 표시
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} /> {/* 다음 페이지로 이동하는 버튼 */}
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
