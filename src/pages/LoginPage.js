import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, loginWithGoogle, setError } from '../redux/userSlice';
import { GoogleLogin } from '@react-oauth/google';
import './LoginPage.style.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const error = useSelector((state) => state.auth.error);

    const handleGoogleSuccess = async (response) => {
        try {
            await dispatch(loginWithGoogle(response.credential)).unwrap();
            console.log("구글 로그인 성공");
            navigate('/');
        } catch (err) {
            console.error("구글 로그인 실패: ", err);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error("구글 로그인 실패: ", error);
        dispatch(setError("구글 로그인에 실패했습니다. 다시 시도해 주세요."));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        console.log("formData", email, password)

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            console.log("로그인 성공");
            navigate('/');
        } catch (error) {
            console.error("로그인 실패: ", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        
            <div className="container">
                <div className="head-container">
                    <h2>로그인</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email <span className="span-start">*</span></label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="이메일을 입력해 주세요"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">비밀번호 <span className="span-start">*</span></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호를 입력해 주세요"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">로그인</button>
                </form>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
        
    );
}

export default LoginPage;
