import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../hooks/User/useResetPassword";
import { RootState } from "../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [gapMessage, setGapMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const { mutate: resetPassword } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setErrorMessage("유효하지 않은 토큰입니다.");
      return;
    }

    if (password.includes(" ")) {
      setGapMessage("비밀번호에는 공백을 포함할 수 없습니다.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    await resetPassword({ password, token });
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto p-[60px]">
        <h1 className="text-2xl font-bold text-center mb-6 pb-2 border-b-4 border-black">
          비밀번호 재설정
        </h1>
        {gapMessage && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
            <span>{gapMessage}</span>
            <button
              onClick={() => setGapMessage('')}
              className="text-red-700 hover:text-red-900"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => { setErrorMessage(""); setGapMessage(""); }}
              className="w-full min-w-[400px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="새 비밀번호"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => { setErrorMessage(""); setGapMessage(""); }}
              className={`w-full min-w-[400px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errorMessage ? 'border-red-500' : ''
                }`}
              placeholder="새 비밀번호 재확인"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
