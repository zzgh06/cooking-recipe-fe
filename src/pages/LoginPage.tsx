import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import KakaoLogin from "../component/KakaoLogin/KakaoLogin";
import { useLoginUser } from "../hooks/User/useLoginUser";
import { useLoginWithGoogle } from "../hooks/User/useLoginWithGoogle";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface FormData {
  id: string;
  password: string;
}

interface LoginData {
  id: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
  });
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: fetchUser } = useLoginWithToken();
  const { mutate: loginUser } = useLoginUser();

  const {
    mutate: loginWithGoogle,
    isError: isLoginWithGoogleError,
    error: loginWithGoogleError,
  } = useLoginWithGoogle();

  useEffect(() => {
    const initializePage = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          await fetchUser();
        }
      } finally {
        setIsLoading(false);
      }
    };
    initializePage();
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [])

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    try {
      if (response.credential) {
        await loginWithGoogle(response.credential);
        await fetchUser();
        navigate("/");
      } else {
        console.error("구글 로그인 실패: Credential이 없습니다.");
      }
    } catch (err) {
      console.error("구글 로그인 실패: ", err);
    }
  };

  const handleGoogleFailure = () => {
    console.error("구글 로그인 실패");
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const { id, password } = formData;
    const loginData: LoginData = { id, password };
    await loginUser(loginData);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const error = isLoginWithGoogleError;
  const errorMessage = loginWithGoogleError?.message;

  return (
    <div className="flex flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-[430px] mx-auto mt-4 p-6">
        <div className="text-center mb-6 border-b-4 border-black">
          <h2 className="text-3xl font-bold py-2">로그인</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              name="id"
              placeholder="아이디를 입력해 주세요"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 mb-4 bg-green-700 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            로그인
          </button>
        </form>
        <div className="flex justify-end mb-4">
          <Link to="/find-password" className="text-black underline">
            비밀번호 찾기
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;