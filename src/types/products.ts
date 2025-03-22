//수파베이스 테이블을 바탕으로 선언해두었습니다.
//잘못된 선언이나 정보는 말씀 부탁드립니다.

export interface Products {
  id: string;
  user_id: string;
  title: string; //제품명
  info: string; //제품정보
  price: number; //제품가격
  tag: string; //제품태그(floral등)
}
