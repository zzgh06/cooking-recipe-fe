import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterUser } from "../hooks/User/useRegisterUser";

interface FormData {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  contact: string;
  shipTo: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    contact: "",
    shipTo: "",
  });

  const [passwordError, setPasswordError] = useState<string>("");
  const { mutateAsync: registerUser, error } = useRegisterUser();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id, password, confirmPassword, name, email, contact, shipTo } = formData;

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      await registerUser({ id, password, name, email, contact, shipTo });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const errorMessage = error?.error

  return (
    <div className="max-w-lg mx-auto mt-10 mb-10 p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">회원가입</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          id="id"
          type="text"
          placeholder="아이디를 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          placeholder="예: fridge@naver.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="name"
          type="text"
          placeholder="이름을 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="contact"
          type="tel"
          placeholder="숫자만 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        <input
          id="shipTo"
          type="text"
          placeholder="주소를 입력해 주세요"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={handleChange}
        />
        {passwordError && (
          <div className="mt-2 text-red-600">
            {passwordError}
          </div>
        )}
        {error && (
          <div className="mt-2 text-red-600">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
