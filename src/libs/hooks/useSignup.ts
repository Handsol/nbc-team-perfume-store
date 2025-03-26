'use client';

import { useCallback, useEffect, useState } from 'react';
import { signInWithGoogle, signInWithKakao, signup } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';
import { Errors, PasswordValidation } from '@/types/signup-validation';
import { SIGNUP_ERROR_MESSAGES } from '@/constants/errorMessages/signupErrorMessages';
import { getPasswordStrength, isAlphaNumericOnly, isValidEmail, validatePassword } from '@/utils/validation';
import { LOGIN_ERROR_MESSAGES } from '@/constants/errorMessages/loginErrorMessages';

export const useSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null,
    confirmPassword: null,
    nickname: null,
    social: null
  });
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    length: false,
    alphabet: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    combination: false,
    noIdMatch: false,
    consecutive: false
  });
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [numLockOn, setNumLockOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setLogin } = useAuthStore();

  // Caps Lock 및 Num Lock 감지
  const checkKeyboardState = useCallback((event: Event) => {
    // event가 KeyboardEvent인지 확인
    if (!(event instanceof KeyboardEvent)) {
      console.warn('Event is not a KeyboardEvent:', event);
      return;
    }

    setCapsLockOn(event.getModifierState('CapsLock'));
    setNumLockOn(!event.getModifierState('NumLock')); // numlock은 이상하게 반대로 동작

    // console.log('CapsLock:', event.getModifierState('CapsLock'), 'NumLock:', event.getModifierState('NumLock'));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', checkKeyboardState);
    return () => window.removeEventListener('keydown', checkKeyboardState);
  }, [checkKeyboardState]);

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Errors = { email: null, password: null, confirmPassword: null, nickname: null, social: null };
    let isValid = true;

    // 이메일 검사
    if (!email) {
      newErrors.email = SIGNUP_ERROR_MESSAGES.email.required;
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = SIGNUP_ERROR_MESSAGES.email.invalid;
      isValid = false;
    }

    // 비밀번호 검사
    if (!password) {
      newErrors.password = SIGNUP_ERROR_MESSAGES.password.required;
      isValid = false;
    } else {
      const validation = validatePassword(password, email);
      setPasswordValidation(validation);
      if (!validation.length) {
        newErrors.password = SIGNUP_ERROR_MESSAGES.password.length;
        isValid = false;
      } else if (!validation.combination) {
        newErrors.password = SIGNUP_ERROR_MESSAGES.password.combination;
        isValid = false;
      } else if (validation.consecutive) {
        newErrors.password = SIGNUP_ERROR_MESSAGES.password.consecutive;
        isValid = false;
      }
    }

    // 닉네임 검사
    if (!nickname) {
      newErrors.nickname = SIGNUP_ERROR_MESSAGES.nickname.required;
      isValid = false;
    } else if (nickname.length < 2 || nickname.length > 12) {
      newErrors.nickname = SIGNUP_ERROR_MESSAGES.nickname.length;
      isValid = false;
    } else if (!isAlphaNumericOnly(nickname)) {
      newErrors.nickname = SIGNUP_ERROR_MESSAGES.nickname.specialChars;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 이메일 입력 시 실시간 유효성 검사
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, email: SIGNUP_ERROR_MESSAGES.email.required }));
    } else if (!isValidEmail(value)) {
      setErrors((prev) => ({ ...prev, email: SIGNUP_ERROR_MESSAGES.email.invalid }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  // 비밀번호 입력 시 실시간 유효성 검사
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordValidation(validatePassword(value, email));

    if (!value) {
      setErrors((prev) => ({ ...prev, password: SIGNUP_ERROR_MESSAGES.password.required }));
    } else {
      const validation = validatePassword(value, email);
      if (!validation.length) {
        setErrors((prev) => ({ ...prev, password: SIGNUP_ERROR_MESSAGES.password.length }));
      } else if (!validation.combination) {
        setErrors((prev) => ({ ...prev, password: SIGNUP_ERROR_MESSAGES.password.combination }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }

    // 비밀번호가 변경될 때 비밀번호 확인 필드도 재검사
    if (confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: SIGNUP_ERROR_MESSAGES.passwordConfirm.diffrent }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  // 비밀번호 확인 입력 시 실시간 유효성 검사
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, confirmPassword: SIGNUP_ERROR_MESSAGES.passwordConfirm.required }));
    } else if (value !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: SIGNUP_ERROR_MESSAGES.passwordConfirm.diffrent }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  // 닉네임 입력 시 실시간 유효성 검사
  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.nickname.required }));
    } else if (value.length < 2 || value.length > 12) {
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.nickname.length }));
    } else if (!isAlphaNumericOnly(value)) {
      setErrors((prev) => ({ ...prev, nickname: SIGNUP_ERROR_MESSAGES.nickname.specialChars }));
    } else {
      setErrors((prev) => ({ ...prev, nickname: null }));
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({ email: null, password: null, confirmPassword: null, nickname: null, social: null });

    const { user, session, error } = await signup({ email, password, nickname });

    if (error) {
      setErrors((prev) => ({ ...prev, email: error }));
    } else if (user && session) {
      setLogin(user, session.access_token);
      alert('회원가입 성공! 이메일을 확인해주세요.');
      setEmail('');
      setPassword('');
      setNickname('');
      setPasswordValidation({
        length: false,
        alphabet: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        combination: false,
        noIdMatch: false,
        consecutive: false
      });
    }

    setLoading(false);
  };

  const passwordStrength = password ? getPasswordStrength(passwordValidation) : '';

  // 카카오 회원가입/로그인 처리
  // 참고: https://euni8917.tistory.com/575
  const handleKakaoAuth = async () => {
    setLoading(true);
    setErrors((prev) => ({ ...prev, social: null }));

    try {
      const { error } = await signInWithKakao(`${window.location.origin}/auth/callback`);

      if (error) {
        setErrors((prev) => ({ ...prev, social: LOGIN_ERROR_MESSAGES.social.kakao.failed }));
        setLoading(false);
        return;
      }
    } catch {
      setErrors((prev) => ({ ...prev, social: LOGIN_ERROR_MESSAGES.social.kakao.error }));
      setLoading(false);
    }
  };

  // 구글 회원가입/로그인 처리
  // 참고: https://velog.io/@jntantmsemt/supabase-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors((prev) => ({ ...prev, social: null }));

    try {
      const { error } = await signInWithGoogle(`${window.location.origin}/auth/callback`);

      if (error) {
        setErrors((prev) => ({ ...prev, social: LOGIN_ERROR_MESSAGES.social.google.failed }));
        setLoading(false);
        return;
      }
    } catch {
      setErrors((prev) => ({ ...prev, social: LOGIN_ERROR_MESSAGES.social.google.error }));
      setLoading(false);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    nickname,
    errors,
    passwordValidation,
    passwordStrength,
    capsLockOn,
    numLockOn,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleNicknameChange,
    handleSignup,
    handleKakaoAuth,
    handleGoogleAuth
  };
};
