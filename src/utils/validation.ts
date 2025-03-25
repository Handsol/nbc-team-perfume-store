// 이메일 형식 검사
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 영문, 숫자, 한글만 포함 여부 검사 (닉네임용)
export const isAlphaNumericOnly = (str: string): boolean => {
  return /^[A-Za-z0-9가-힣]+$/.test(str);
};

// 영문 포함 여부 검사 (대소문자 구분 없음)
export const hasAlphabet = (str: string): boolean => {
  return /[A-Za-z]/.test(str);
};

// 대문자 포함 여부 검사
export const hasUppercase = (str: string): boolean => {
  return /[A-Z]/.test(str);
};

// 소문자 포함 여부 검사
export const hasLowercase = (str: string): boolean => {
  return /[a-z]/.test(str);
};

// 숫자 포함 여부 검사
export const hasNumber = (str: string): boolean => {
  return /\d/.test(str);
};

// 특수문자 포함 여부 검사
export const hasSpecialCharacters = (str: string): boolean => {
  return /[!@#$%^&*]/.test(str);
};

// 비밀번호와 이메일 간 3자 이상 동일 여부 검사
export const hasIdMatch = (password: string, email: string): boolean => {
  if (!email) return false;
  const emailId = email.split('@')[0].toLowerCase().slice(0, 3);
  return password.toLowerCase().includes(emailId);
};

// 연속된 문자(4개 이상) 포함 여부 검사
export const hasConsecutiveChars = (str: string): boolean => {
  return /(.)\1{3,}/.test(str);
};

// 비밀번호 유효성 검사 통합 함수
export const validatePassword = (password: string, email: string) => {
  const length = password.length >= 8;
  const alphabet = hasAlphabet(password);
  const uppercase = hasUppercase(password);
  const lowercase = hasLowercase(password);
  const number = hasNumber(password);
  const special = hasSpecialCharacters(password);
  const combination = [alphabet, number, special].filter(Boolean).length >= 3;
  const noIdMatch = !hasIdMatch(password, email);
  const consecutive = hasConsecutiveChars(password);

  return {
    length,
    alphabet,
    uppercase,
    lowercase,
    number,
    special,
    combination,
    noIdMatch,
    consecutive
  };
};

// 비밀번호 강도 계산 함수
export const getPasswordStrength = (validation: ReturnType<typeof validatePassword>): string => {
  // 기본 조건 점수 (length, combination, consecutive)
  let score = [validation.length, validation.combination, validation.consecutive].filter(Boolean).length;

  // 추가 점수
  if (validation.uppercase && validation.lowercase) score += 1;
  if (validation.noIdMatch) score += 1;

  // 강도 등급
  if (score >= 5) return '강함';
  if (score >= 4) return '보통';
  return '약함';
};
