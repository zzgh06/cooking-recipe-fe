import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from '../redux/userSlice';
import './RegisterPage.style.css';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        contact: "",
        shipTo: "",
    });
    console.log("formData", formData)

    const [passwordError, setPasswordError] = useState("");
    const error = useSelector((state) => state.auth.error);

    const handleRegister = async (event) => {
        event.preventDefault();        
        const { id, password, confirmPassword, name, email, contact, shipTo } = formData;

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError("");
        }

        dispatch(registerUser({ id, password, name, email, contact, shipTo }))
          .unwrap()
          .then(() => {
            console.log("click register")
            navigate('/login');
          })
          .catch((err) => {
            console.error("Registration failed: ", err);
          });
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
                <h2>회원가입</h2>
               
            </div>
            
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="id">아이디 <span className="span-start">*</span></label>
                    <input type="text" id="id" placeholder="아이디를 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일<span className="span-start">*</span></label>
                    <input type="email" id="email" placeholder="예: marketkurly@kurly.com" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호<span className="span-start">*</span></label>
                    <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">비밀번호 확인<span className="span-start">*</span></label>
                    <input type="password" id="confirmPassword" placeholder="비밀번호를 한 번 더 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">이름<span className="span-start">*</span></label>
                    <input type="text" id="name" placeholder="이름을 입력해 주세요" onChange={handleChange} required />
                </div>                
                <div className="form-group">
                    <label htmlFor="contact">휴대폰<span className="span-start">*</span></label>
                    <input type="tel" id="contact" placeholder="숫자만 입력해 주세요" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="shipTo">주소<span className="span-start">*</span></label>
                    <input type="text" id="shipTo" placeholder="주소를 입력해 주세요" onChange={handleChange} required />
                </div>
                {passwordError && <p className="error">{passwordError}</p>}
                {error && <p className="error">{error}</p>}
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;
