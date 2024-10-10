import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from '../hooks/User/useForgotPassword';

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, error, isPending } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgotPassword({ email });
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          비밀번호 찾기
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          가입한 이메일을 입력해주세요
        </p>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm text-gray-700 mb-1">
                가입한 이메일을 입력해주세요.
                <br /> 비밀번호 재설정 링크를 통해 비밀번호를 변경합니다.
              </p>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                  placeholder="메일 주소를 입력하세요"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">
                    {error.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isPending ? "변경 중..." : "비밀번호 재설정"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPasswordPage;
