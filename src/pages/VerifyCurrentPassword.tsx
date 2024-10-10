import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVerifyPasswordLoading, setVerifyPasswordError, setIsAuthenticated, resetAuthState } from "../redux/userSlice";
import { useVerifyCurrentPassword } from "../hooks/User/useVerifyCurrentPassword";
import { RootState } from "../redux/store";

interface VerifyCurrentPasswordProps {
  onVerifySuccess: () => void;
}

const VerifyCurrentPassword = ({ onVerifySuccess }: VerifyCurrentPasswordProps) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const { mutate: verifyPassword } = useVerifyCurrentPassword();

  useEffect(() => {
    if (isAuthenticated) {
      onVerifySuccess();
      dispatch(resetAuthState());
    }
  }, [isAuthenticated, onVerifySuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setVerifyPasswordLoading(true));
    verifyPassword(currentPassword, {
      onSuccess: () => {
        dispatch(setVerifyPasswordLoading(false));
        dispatch(setIsAuthenticated(true));
        dispatch(setVerifyPasswordError(null))
        onVerifySuccess();
      },
      onError: (error: unknown) => {
        dispatch(setVerifyPasswordLoading(false));
        if (error instanceof Error) {
          dispatch(setVerifyPasswordError(error.message));
        } else {
          dispatch(setVerifyPasswordError("알 수 없는 오류가 발생했습니다.."));
        }
      },
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <div className="flex justify-start items-baseline border-b-4 border-black">
          <h5 className="text-2xl font-semibold">나의 정보</h5>
          <p className="ml-4 text-lg">회원정보 수정</p>
        </div>
        <div className="flex flex-col items-center mt-4 px-2 w-full h-full">
          <div className="mb-3 text-center">
            <h5 className="text-2xl font-semibold mb-2">비밀번호 재확인</h5>
            <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-none border-t-3 border-y-2 border-black p-8 flex flex-col">
            {error && (
              <div className="mb-2 flex items-center text-red-600">
                <p className="ml-1 text-sm">{error}</p>
              </div>
            )}
            <div className="flex flex-col space-y-4">
              <div>
                <input
                  id="currentPassword"
                  type="password"
                  className="border rounded-md w-full px-2 py-3"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="현재 비밀번호 *"
                  required
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "인증 중..." : "비밀번호 확인"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCurrentPassword;
