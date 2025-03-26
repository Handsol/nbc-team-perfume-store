'use client';

import { useSignup } from '@/libs/hooks/useSignup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SIGNUP_ERROR_MESSAGES } from '@/constants/errorMessages/signupErrorMessages';
import { CheckCircle, XCircle } from 'lucide-react';

// https://designcompass.org/2024/10/23/new-password-guideline/
// https://brunch.co.kr/@ab841109/5 참고
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
    handleSignup
  } = useSignup();

  const passwordConditions = [
    { key: 'length', message: SIGNUP_ERROR_MESSAGES.password.length },
    { key: 'combination', message: SIGNUP_ERROR_MESSAGES.password.combination },
    { key: 'consecutive', message: SIGNUP_ERROR_MESSAGES.password.consecutive }
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
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">회원가입</h1>

      <div className="mb-5">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={loading}
          className={`w-full p-3 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
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
        {errors.password === SIGNUP_ERROR_MESSAGES.password.required && (
          <p className="text-red-500 text-sm mt-2">{errors.password}</p>
        )}
        {password && (
          <>
            <ul className="text-sm mt-3 space-y-2">
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
            <div className="flex items-center justify-between mt-3 mb-2">
              <span className="text-sm text-gray-600">비밀번호 강도:</span>
              <span className={`text-sm ${strengthBar.color.replace('bg-', 'text-')}`}>{strengthBar.text}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
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
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
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
        {errors.nickname && <p className="text-red-500 text-sm mt-2">{errors.nickname}</p>}
      </div>

      {(capsLockOn || numLockOn) && (
        <div className="mb-5 p-3 bg-yellow-50 rounded-md">
          <div className="text-yellow-600 text-sm">
            {capsLockOn && <p className="flex items-center">⚠️ {SIGNUP_ERROR_MESSAGES.keyboard.capsLock}</p>}
            {numLockOn && <p className="flex items-center">⚠️ {SIGNUP_ERROR_MESSAGES.keyboard.numLock}</p>}
          </div>
        </div>
      )}

      <Button onClick={handleSignup} disabled={loading} className="w-full py-3 text-white rounded-lg">
        {loading ? '처리 중...' : '회원가입'}
      </Button>
    </div>
  );
}
