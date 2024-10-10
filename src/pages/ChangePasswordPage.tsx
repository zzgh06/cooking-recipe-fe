import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useChangePassword } from "../hooks/User/useChangePassword";
import {
  logout,
  setChangePasswordError,
  setChangePasswordLoading,
} from "../redux/userSlice";
import { RootState } from "../redux/store";


const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gapMessage, setGapMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: changePassword } = useChangePassword();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.includes(" ")) {
      setGapMessage("비밀번호에는 공백을 포함할 수 없습니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    dispatch(setChangePasswordLoading(true));
    changePassword(newPassword, {
      onSuccess: () => {
        dispatch(setChangePasswordLoading(false));
        dispatch(setChangePasswordError(null));
        dispatch(logout());
        navigate("/login");
      },
      onError: (error) => {
        dispatch(setChangePasswordLoading(false));
        const errorMessage = error?.message || "비밀번호 변경 중 오류가 발생했습니다.";
        dispatch(setChangePasswordError(errorMessage));
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="flex justify-start items-baseline border-b-4 border-black pl-2">
        <h5 className="text-2xl font-semibold">나의 정보</h5>
        <p className="ml-4 text-lg">비밀번호 변경</p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="mb-3 text-center">
          <h5 className="text-2xl font-semibold mt-4 mb-1">비밀번호 변경</h5>
          <p>회원님만의 안전하고 새로운 비밀번호를 입력해주세요.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-lg px-6 pt-3"
        >
          {gapMessage && (
            <p className="text-red-600 mb-4 flex items-center">
              <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
              {gapMessage}
            </p>
          )}
          {error && (
            <p className="text-red-600 mb-4 flex items-center">
              <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
              {error}
            </p>
          )}
          <div className="mb-4 w-full">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => {
                  setErrorMessage("");
                  setGapMessage("");
                }}
                className="w-full border border-gray-300 rounded px-2 py-4"
                placeholder="새 비밀번호"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-5 text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <div className="mb-4 w-full">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => {
                  setErrorMessage("");
                  setGapMessage("");
                }}
                className={`w-full border px-2 py-4 rounded ${errorMessage ? "border-red-600" : "border-gray-300"
                  }`}
                placeholder="새 비밀번호 재확인"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-5 text-gray-600"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                />
              </button>
            </div>
            {errorMessage && (
              <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200 hover:bg-blue-500 disabled:bg-blue-300"
          >
            {loading ? "변경 중..." : "비밀번호 재설정"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
