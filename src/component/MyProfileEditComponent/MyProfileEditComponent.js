import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
import './MyProfileEditComponent.style.css'

const MyProfileEditComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    id: user?.user.id || "", // id 필드 추가
    email: user?.user.email || "",
    name: user?.user.name || "",
    contact: user?.user.contact || "",
    shipTo: user?.user.shipTo || "",
  });

  useEffect(() => {
    if (user?.user) {
      setFormData({
        id: user.user.id,
        email: user.user.email,
        name: user.user.name,
        contact: user.user.contact,
        shipTo: user.user.shipTo,
      });
    }
  }, [user]);
  
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(updateUser({ id: user?.user._id, userData: formData }))
      .unwrap()
      .then(() => {
        console.log("Profile updated successfully.");
      })
      .catch((err) => {
        console.error("Profile update failed: ", err);
      });
  };

  return (
    <div className="container">
      <div className="head-container">
        <h2>프로필 수정</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contact">휴대폰</label>
          <input type="tel" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="shipTo">주소</label>
          <input type="text" id="shipTo" value={formData.shipTo} onChange={handleChange} required />
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  )
}

export default MyProfileEditComponent;
