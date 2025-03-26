'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateNickname, updatePassword } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';
import { SIGNUP_ERROR_MESSAGES } from '@/constants/errorMessages/signupErrorMessages';

interface UpdateErrors {
  nickname: string | null;
  currentPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}

export const useMyPage = () => {
  const router = useRouter();
  const { user, setLogin } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState(user?.email || '');
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState<UpdateErrors>({
    nickname: null,
    currentPassword: null,
    newPassword: null,
    confirmNewPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>('email');

  // 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      const { user: fetchedUser, provider: fetchedProvider, error } = await getCurrentUser();
      if (error || !fetchedUser) {
        router.push('/login'); // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
        return;
      }
      setEmail(fetchedUser.email);
      setNickname(fetchedUser.nickname);
      setProvider(fetchedProvider || 'email');
    };

    loadUser();
  }, [router, setLogin]);

  // 2.5초 후 메세지 창 닫히도록 기능 구현
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrors({
          nickname: null,
          currentPassword: null,
          newPassword: null,
          confirmNewPassword: null,
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errors]);

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    const validationError = validateNickname(value);
    setErrors((prev) => ({ ...prev, nickname: validationError }));
  };

  // 닉네임 업데이트
  const handleUpdateNickname = async () => {
    if (errors.nickname || !nickname) {
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

    try {
      const { user: updatedUser, session, error } = await updateNickname(nickname);

      if (error) {
          setErrors((prev) => ({ ...prev, nickname: error }));
          return;
      }

      if (updatedUser && session) {
          setLogin(updatedUser, session.access_token);
          setSuccessMessage('닉네임이 성공적으로 변경되었습니다.');
      } else {
          setErrors((prev) => ({ ...prev, nickname: '사용자 정보를 업데이트할 수 없습니다.' }));
        }
      } catch {
        setErrors((prev) => ({ ...prev, nickname: '닉네임 변경 중 오류 발생' }));
      } finally {
        setLoading(false);
      }
    };

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    if (provider === 'email' && !value) {
      setErrors((prev) => ({ ...prev, currentPassword: '현재 비밀번호를 입력해주세요.' }));
    } else {
      setErrors((prev) => ({ ...prev, currentPassword: null }));
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    const validationError = validatePassword(value);
    setErrors((prev) => ({ ...prev, newPassword: validationError }));

    if (confirmNewPassword && value !== confirmNewPassword) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmNewPassword: null }));
    }
  };

  const handleConfirmNewPasswordChange = (value: string) => {
    setConfirmNewPassword(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: '비밀번호 확인을 입력해주세요.' }));
    } else if (value !== newPassword) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmNewPassword: null }));
    }
  };

  // 비밀번호 업데이트
  const handleUpdatePassword = async () => {
    if (errors.currentPassword || errors.newPassword || errors.confirmNewPassword) {
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

    try {
    const { error } = await updatePassword(currentPassword, newPassword);
      if (error) {
        setErrors((prev) => ({ ...prev, newPassword: error }));
        return;
      }

      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch {
      setErrors((prev) => ({ ...prev, newPassword: '비밀번호 변경 중 오류 발생' }));
    } finally {
      setLoading(false);
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (value: string): string | null => {
    if (!value) {
      return SIGNUP_ERROR_MESSAGES.password.required;
    }
    if (value.length < 8) {
      return SIGNUP_ERROR_MESSAGES.password.length;
    }
    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return SIGNUP_ERROR_MESSAGES.password.combination;
    }
    if (/(.)\1{3,}/.test(value)) {
      return SIGNUP_ERROR_MESSAGES.password.consecutive;
    }
    return null;
  };

  // 닉네임 유효성 검사
  const validateNickname = (value: string): string | null => {
    if (!value) {
      return SIGNUP_ERROR_MESSAGES.nickname.required;
    }
    if (value.length < 2 || value.length > 12) {
      return SIGNUP_ERROR_MESSAGES.nickname.length;
    }
    if (!/^[a-zA-Z0-9가-힣]+$/.test(value)) {
      return SIGNUP_ERROR_MESSAGES.nickname.specialChars;
    }
    return null;
  };

  const goToMyPage = () => {
    router.push('/my-page');
  };

  return {
    activeTab,
    setActiveTab,
    provider,
    email,
    nickname,
    handleNicknameChange,
    handleUpdateNickname,
    currentPassword,
    handleCurrentPasswordChange,
    newPassword,
    handleNewPasswordChange,
    confirmNewPassword,
    handleConfirmNewPasswordChange,
    handleUpdatePassword,
    errors,
    loading,
    successMessage,
    goToMyPage
  };
};