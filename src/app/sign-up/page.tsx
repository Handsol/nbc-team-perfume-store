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
    nickname,
    errors,
    passwordValidation,
    capsLockOn,
    numLockOn,
    loading,
    handleEmailChange,
    handlePasswordChange,
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

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">회원가입</h1>

      <div className="mb-4">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={loading}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <div className="relative">
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            disabled={loading}
            className={errors.password ? 'border-red-500' : ''}
          />
        </div>
        {errors.password === SIGNUP_ERROR_MESSAGES.password.required && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
        {password && (
          <>
            <ul className="text-sm mt-2 space-y-1">
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
          </>
        )}
      </div>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
          disabled={loading}
          className={errors.nickname ? 'border-red-500' : ''}
        />
        {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
      </div>

      <div className="mb-4">
        {(capsLockOn || numLockOn) && (
          <div className="mt-2 p-2 bg-yellow-50 rounded-md">
            <div className="text-yellow-500 text-sm">
              {capsLockOn && (
                <p className="flex items-center">
                  <span className="mr-1">⚠️</span>
                  {SIGNUP_ERROR_MESSAGES.keyboard.capsLock}
                </p>
              )}
              {numLockOn && (
                <p className="flex items-center">
                  <span className="mr-1">⚠️</span>
                  {SIGNUP_ERROR_MESSAGES.keyboard.numLock}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <Button onClick={handleSignup} disabled={loading}>
        {loading ? '처리 중...' : '회원가입'}
      </Button>
    </div>
  );
}
