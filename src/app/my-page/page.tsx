'use client';

import { useMyPage } from '@/libs/hooks/useMyPage';

export default function MyPage() {
  const {
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">마이 페이지</h1>

      {/* 성공 메시지 */}
      {successMessage && (
        <div
          role="alert"
          className="mb-4 p-3 bg-green-100 text-green-700 rounded animate-fade-in"
        >
          {successMessage}
        </div>
      )}

      {/* 닉네임 변경 섹션 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">닉네임 변경</h2>
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
            새 닉네임
          </label>
          <input
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
        <button
          onClick={handleUpdateNickname}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '처리 중...' : '닉네임 변경'}
        </button>
      </div>

      {/* 비밀번호 변경 섹션 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">비밀번호 변경</h2>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            현재 비밀번호
          </label>
          <input
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
          <input
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
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => handleConfirmNewPasswordChange(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="새 비밀번호를 다시 입력하세요"
            disabled={loading}
            aria-invalid={!!errors.confirmNewPassword}
            aria-describedby={errors.confirmNewPassword ? 'confirmNewPassword-error' : undefined}
          />
          {errors.confirmNewPassword && (
            <p id="confirmNewPassword-error" className="mt-1 text-sm text-red-600">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? '처리 중...' : '비밀번호 변경'}
        </button>
      </div>
    </div>
  );
}