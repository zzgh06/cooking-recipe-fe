import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser, loginWithGoogle, setError } from '../redux/userSlice';
import './LoginPage.style.css'

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
            await dispatch(loginWithGoogle(response.tokenId)).unwrap();
            console.log("구글 로그인 성공");
            navigate('/');
        } catch (err) {
            console.error("구글 로그인 실패: ", err);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = formData;

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
                    <label htmlFor="id">Email <span className="span-start">*</span></label>
                    <input type="text" id="email" placeholder="이메일을 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호 <span className="span-start">*</span></label>
                    <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" onChange={handleChange} required />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">로그인</button>
            </form>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="구글 로그인"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default LoginPage;
