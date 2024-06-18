import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, setError } from '../redux/userSlice';
import './LoginPage.style.css'

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    const error = useSelector((state) => state.auth.error);

    const handleLogin = async (event) => {
        event.preventDefault();
        const { id, password } = formData;

        try {
            await dispatch(loginUser({ id, password })).unwrap();
            console.log("로그인 성공");
            navigate('/'); // 로그인 성공 후 대시보드 페이지로 이동
        } catch (err) {
            console.error("로그인 실패: ", err);
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <div className="container">
            <div className="head-container">
                <h2>로그인</h2>
            </div>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="id">아이디 <span className="span-start">*</span></label>
                    <input type="text" id="id" placeholder="아이디를 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호 <span className="span-start">*</span></label>
                    <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default LoginPage;
