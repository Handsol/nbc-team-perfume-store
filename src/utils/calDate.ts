export const calDate = (dateString: string): string => {
  const now = new Date(); // 현재 시간 (2025-03-26 기준)
  const past = new Date(dateString); // 주어진 시간
  const diffInMs = now.getTime() - past.getTime(); // 밀리초 단위 차이
  const diffInSeconds = Math.floor(diffInMs / 1000); // 초 단위
  const diffInMinutes = Math.floor(diffInSeconds / 60); // 분 단위
  const diffInHours = Math.floor(diffInMinutes / 60); // 시간 단위
  const diffInDays = Math.floor(diffInHours / 24); // 일 단위
  const diffInWeeks = Math.floor(diffInDays / 7); // 주 단위
  const diffInMonths = Math.floor(diffInDays / 30); // 달 단위 (30일 기준)
  const diffInYears = Math.floor(diffInDays / 365); // 년 단위 (365일 기준)

  // 방금 전 (1분 미만)
  if (diffInSeconds < 60) {
    return '방금 전';
  }
  // 1분 전 ~ 59분 전
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  // 1시간 전 ~ 23시간 전
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }
  // 1일 전 ~ 6일 전
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }
  // 1주일 전 ~ 4주일 전
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주일 전`;
  }
  // 1달 전 ~ 12달 전
  if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }
  // 1년 전 이상
  return `${diffInYears}년 전`;
};
