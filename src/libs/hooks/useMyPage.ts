'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateNickname, updatePassword } from '@/libs/api/supabase-user-api';
import { useAuthStore } from '@/zustand/authStore';

interface UpdateErrors {
  nickname: string | null;
  currentPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}

export const useMyPage = () => {
  const router = useRouter();
  const { user, setLogin } = useAuthStore();
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

  // 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      const { user: fetchedUser, error } = await getCurrentUser();
      if (error || !fetchedUser) {
        router.push('/login'); // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
        return;
      }
      setNickname(fetchedUser.nickname);
    };

    loadUser();
  }, [router, setLogin]);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임은 필수 입력 항목입니다.' }));
    } else if (value.length < 2 || value.length > 12) {
      setErrors((prev) => ({ ...prev, nickname: '닉네임은 2~12자 사이여야 합니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, nickname: null }));
    }
  };

  // 닉네임 업데이트
  const handleUpdateNickname = async () => {
    if (errors.nickname || !nickname) {
      return;
    }

    setLoading(true);
    setSuccessMessage(null);

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
  };

  // 비밀번호 입력 핸들러
  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, currentPassword: '현재 비밀번호를 입력해주세요.' }));
    } else {
      setErrors((prev) => ({ ...prev, currentPassword: null }));
    }
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    if (!value) {
      setErrors((prev) => ({ ...prev, newPassword: '새 비밀번호를 입력해주세요.' }));
    } else if (value.length < 6) {
      setErrors((prev) => ({ ...prev, newPassword: '비밀번호는 최소 6자 이상이어야 합니다.' }));
    } else {
      setErrors((prev) => ({ ...prev, newPassword: null }));
    }

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

    const { error } = await updatePassword(currentPassword, newPassword);
      if (error) {
        setErrors((prev) => ({ ...prev, newPassword: error }));
        return;
      }

      setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
  };

  return {
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
  };
};