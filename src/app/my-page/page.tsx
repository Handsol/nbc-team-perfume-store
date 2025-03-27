'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMyPage } from '@/libs/hooks/useMyPage';

export default function MyPage() {
  const {
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
  } = useMyPage();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 사이드바 */}
      {/* 스타일 이슈로 Button 태그 대신 html button 태그 사용 */}
      <div className="w-64 bg-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-6">내정보관리</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left py-2 px-4 rounded ${
                activeTab === 'profile'
                  ? 'bg-gray-300 font-semibold'
                  : 'hover:bg-gray-300'
              }`}
            >
              개인정보변경
            </button>
          </li>
          {provider === 'email' && (
            <li>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left py-2 px-4 rounded ${
                  activeTab === 'password'
                    ? 'bg-gray-300 font-semibold'
                    : 'hover:bg-gray-300'
                }`}
              >
                비밀번호 변경
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-1 p-6">
        {activeTab === 'profile' && (
          <div className="max-w-md">
            <h1 className="text-xl font-semibold mb-6">개인정보변경</h1>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="새 닉네임을 입력하세요"
                disabled={loading}
                aria-invalid={!!errors.nickname}
                aria-describedby={errors.nickname ? 'nickname-error' : undefined}
              />
              {errors.nickname && (
                <p id="nickname-error" className="mt-1 text-sm text-red-600">
                  {errors.nickname}
                </p>
              )}
            </div>
            <div className="min-h-[60px] mb-4">
              {successMessage ? (
                <div
                  role="alert"
                  className="p-3 bg-green-100 text-green-700 rounded-lg shadow-md animate-fade-in"
                >
                  {successMessage}
                </div>
              ) : (
                <div className="h-[48px]"></div>
              )}
            </div>
            <div className="flex justify-start">
              <Button
                onClick={handleUpdateNickname}
                disabled={loading}
              >
                {loading ? '처리 중...' : '저장'}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'password' && provider === 'email' && (
          <div className="max-w-md">
            <h1 className="text-xl font-semibold mb-6">비밀번호 변경</h1>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                현재 비밀번호
              </label>
              <Input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => handleCurrentPasswordChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="현재 비밀번호를 입력하세요"
                disabled={loading}
                aria-invalid={!!errors.currentPassword}
                aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
              />
              {errors.currentPassword && (
                <p id="currentPassword-error" className="mt-1 text-sm text-red-600">
                  {errors.currentPassword}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                새 비밀번호
              </label>
              <Input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="새 비밀번호를 입력하세요"
                disabled={loading}
                aria-invalid={!!errors.newPassword}
                aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
              />
              {errors.newPassword && (
                <p id="newPassword-error" className="mt-1 text-sm text-red-600">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                새 비밀번호 확인
              </label>
              <Input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="새 비밀번호를 다시 입력하세요"
                disabled={loading}
                aria-invalid={!!errors.confirmNewPassword}
                aria-describedby={
                  errors.confirmNewPassword ? 'confirmNewPassword-error' : undefined
                }
              />
              {errors.confirmNewPassword && (
                <p id="confirmNewPassword-error" className="mt-1 text-sm text-red-600">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
            <div className="min-h-[60px] mb-4">
              {successMessage ? (
                <div
                  role="alert"
                  className="p-3 bg-green-100 text-green-700 rounded-lg shadow-md animate-fade-in"
                >
                  {successMessage}
                </div>
              ): (
                <div className="h-[48px]"></div>
              )}
            </div>
            <div className="flex justify-start">
              <Button
                onClick={handleUpdatePassword}
                disabled={loading}
              >
                {loading ? '처리 중...' : '적용'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}