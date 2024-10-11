import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center my-[200px]">
      <h1 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다.</h1>
      <p className="text-xl mb-4">요청하신 페이지가 존재하지 않습니다.</p>
      <button 
        onClick={goHome} 
        className="px-6 py-2 border border-gray-300 rounded-md text-lg text-gray-700 hover:bg-gray-100 transition duration-300"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default NotFoundPage;
