export const SIGNUP_ERROR_MESSAGES = {
  email: {
    required: '이메일은 필수 입력 항목입니다.',
    invalid: '유효한 이메일 형식이 아닙니다.'
  },
  password: {
    required: '비밀번호는 필수 입력 항목입니다.',
    length: '비밀번호는 최소 8자 이상이어야 합니다.',
    combination: '영문, 숫자, 특수문자가 포함되어야 합니다.',
    consecutive: '4자 이상 연속된 문자/숫자를 포함할 수 없습니다.'
  },
  nickname: {
    required: '닉네임은 필수 입력 항목입니다.',
    length: '닉네임은 2자 이상 12자 이하여야 합니다.',
    specialChars: '닉네임은 특수문자를 포함할 수 없습니다.'
  },
  keyboard: {
    capsLock: 'Capslock이 켜져 있습니다!',
    numLock: 'Numlock이 켜져 있습니다!'
  }
};
