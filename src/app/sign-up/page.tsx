'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { ACCOUNT_ERROR_MESSAGES } from '@/constants/errorMessages/accountErrorMessages';
import { useSignup } from '@/libs/hooks/useSignup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const {
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
    handleCancel
  } = useSignup();

  const passwordConditions = [
    { key: 'length', message: ACCOUNT_ERROR_MESSAGES.password.length },
    { key: 'combination', message: ACCOUNT_ERROR_MESSAGES.password.combination },
    { key: 'consecutive', message: ACCOUNT_ERROR_MESSAGES.password.consecutive }
  ];

  const getConditionStyle = (isValid: boolean) => ({
    color: isValid ? 'text-green-500' : 'text-gray-500',
    icon: isValid ? <CheckCircle size={16} /> : <XCircle size={16} />
  });

  const getStrengthBarStyle = (strength: string) => {
    switch (strength) {
      case '약함':
        return { width: '33%', color: 'bg-red-500', text: '약함' };
      case '보통':
        return { width: '66%', color: 'bg-yellow-500', text: '보통' };
      case '강함':
        return { width: '100%', color: 'bg-green-500', text: '강함' };
      default:
        return { width: '0%', color: 'bg-gray-300', text: '없음' };
    }
  };

  const strengthBar = getStrengthBarStyle(passwordStrength);

  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">회원가입</h1>

      <div className="mb-5">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={loading}
          className={`w-full p-3 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="mb-5">
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          disabled={loading}
          className={`w-full p-3 transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password === ACCOUNT_ERROR_MESSAGES.password.required && (
          <p className="mt-2 text-sm text-red-500">{errors.password}</p>
        )}
        {password && (
          <>
            <ul className="mt-3 space-y-2 text-sm">
              {passwordConditions.map((condition) => {
                let isValid = false;
                if (condition.key === 'length') isValid = passwordValidation.length;
                if (condition.key === 'combination') isValid = passwordValidation.combination;
                if (condition.key === 'consecutive') isValid = !passwordValidation.consecutive;

                const { color, icon } = getConditionStyle(isValid);
                return (
                  <li key={condition.key} className={`flex items-center ${color}`}>
                    <span className="mr-2">{icon}</span>
                    <span>{condition.message}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mb-2 mt-3 flex items-center justify-between">
              <span className="text-gray-600 text-sm">비밀번호 강도:</span>
              <span className={`text-sm ${strengthBar.color.replace('bg-', 'text-')}`}>{strengthBar.text}</span>
            </div>
            <div className="bg-gray-200 h-2.5 w-full rounded-full">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${strengthBar.color}`}
                style={{ width: strengthBar.width }}
              />
            </div>
          </>
        )}
      </div>

      <div className="mb-5">
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          disabled={loading}
          className={`w-full p-3 transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
          disabled={loading}
          className={`w-full p-3 transition-all duration-200 ${errors.nickname ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.nickname && <p className="mt-2 text-sm text-red-500">{errors.nickname}</p>}
      </div>

      {(capsLockOn || numLockOn) && (
        <div className="mb-5 rounded-md bg-yellow-50 p-3">
          <div className="text-sm text-yellow-600">
            {capsLockOn && <p className="flex items-center">⚠️ {ACCOUNT_ERROR_MESSAGES.keyboard.capsLock}</p>}
            {numLockOn && <p className="flex items-center">⚠️ {ACCOUNT_ERROR_MESSAGES.keyboard.numLock}</p>}
          </div>
        </div>
      )}

      <Button onClick={handleSignup} disabled={loading} className="mb-5 w-full rounded-lg py-3 text-white">
        {loading ? '처리 중...' : '회원가입'}
      </Button>

      <Button onClick={handleCancel} className="w-full rounded-lg py-3 text-white">
        취소
      </Button>
    </div>
  );
}
