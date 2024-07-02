import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithToken, updateUser } from "../../redux/userSlice";
import "./MyProfileEditComponent.style.css";
import { Col, Container, Form } from "react-bootstrap";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/img/profile_user.png";

const MyProfileEditComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user, loading, error } = useSelector((state) => state.auth);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [shipToError, setShipToError] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    email: "",
    name: "",
    contact: "",
    shipTo: ""
  });

  // 이메일 유효성 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        image: user?.user.image || "",
        email: user?.user.email || "",
        name: user?.user.name || "",
        contact: formatPhoneNumber(user?.user.contact) || "",
        shipTo : user?.user.shipTo || ""
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const formattedValue = id === "contact" ? formatPhoneNumber(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: formattedValue,
    }));

    if (id === "email") {
      setEmailError("");
    }

    if (id === "name") {
      setNameError("");
    }

    if (id === "contact") {
      const cleanedContact = formattedValue.replace(/\D/g, "");
      if (cleanedContact.length === 11) {
        setContactError("");
      }
    }
  };

  // 이미지 업로드
  const uploadImage = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { image, email, name, contact, shipTo } = formData;
  
    // 유효성 검사
    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 주소를 입력해 주세요.");
      return;
    }
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      setNameError("이름은 한글이나 영어만 입력할 수 있습니다.");
      return;
    }
    const cleanedContact = contact.replace(/\D/g, "");
    if (cleanedContact.length !== 11) {
      setContactError("전화번호는 11자리 숫자여야 합니다.");
      return;
    }
  
    await dispatch(updateUser({ image, email, name, contact, shipTo }));
    navigate('/account/profile')
  };

  const formatPhoneNumber = (value) => {
    let cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length > 11) {
      cleanValue = cleanValue.slice(0, 11);
    }
    const match = cleanValue.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);

    if (match) {
      const formattedValue = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join("-");
      return formattedValue;
    }

    return cleanValue;
  };
  return (
    <div>
      <div className="head-container">
        <h2>나의 계정</h2>
        <p>프로필 수정</p>
      </div>
      <div className="profile-container">
        <Form className="edit_user_form_container" onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="image" className="profile_image">
            <Form.Label>프로필 이미지</Form.Label>
            <div class="upload_img_area">
              <div class="edit_image_box">
                <img
                  id="uploadedimage"
                  src={formData?.image === "" ? defaultProfile : formData?.image}
                  className="upload-image"
                  alt="uploadedimage"
                ></img>
              </div>
              <CloudinaryUploadWidget uploadImage={uploadImage} />
            </div>
          </Form.Group>
          <Col>
            <Form.Group as={Col} controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                id="email"
                onChange={handleChange}
                type="text"
                placeholder="이메일을 입력해 주세요"
                required
                value={formData.email}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>이름</Form.Label>
              <Form.Control
                id="name"
                onChange={handleChange}
                type="text"
                placeholder="한글 또는 영어로 입력해 주세요"
                required
                value={formData.name}
                isInvalid={!!nameError}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="contact">
              <Form.Label>연락처</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="11자리로 입력해 주세요"
                required
                id="contact"
                value={formData.contact}
                isInvalid={!!contactError}
              />
              <Form.Control.Feedback type="invalid">
                {contactError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="shipTo">
              <Form.Label>주소</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="주소를 입력해주세요."
                required
                id="shipTo"
                value={formData.shipTo}
                isInvalid={!!shipToError}
              />
              <Form.Control.Feedback type="invalid">
                {shipToError}
              </Form.Control.Feedback>
            </Form.Group>

            <button className="edit_submit_btn" type="submit">
              저장하기
            </button>
          </Col>
        </Form>
        {/* <div class="outMember_container" style={{ width: "fit-content" }}>
          <p className="outMember_btn" onClick={handleMemberOut}>
            회원탈퇴하기
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default MyProfileEditComponent;
