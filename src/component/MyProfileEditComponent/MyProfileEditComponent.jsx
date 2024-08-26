import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, styled } from "@mui/material";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/img/profile_user.png";
import { useUpdateUser } from "../../hooks/User/useUpdateUser";

const HeadContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  borderBottom: '4px solid black',
  paddingLeft: '10px',
});

const ProfileContainer = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const EditUserFormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  boxShadow: 'none',
  gap: '16px',
  padding: '16px',
});

const UploadImgArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const UploadImage = styled('img')({
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  marginBottom: "10px",
  borderRadius: '50%',
  border: '2px solid lightgrey'
});

const EditSubmitBtn = styled(Button)({
  margin: '0 auto',
  marginTop: '16px',
  width: '150px',
});

const ProfileImage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
})


const MyProfileEditComponent = ({user}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    email: "",
    name: "",
    contact: "",
    shipTo: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    name: "",
    contact: "",
    shipTo: "",
  });
  
  const { mutate: updateUser, isLoading } = useUpdateUser();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  useEffect(() => {
    if (user) {
      setFormData({
        image: user?.image || '',
        email: user?.email || '',
        name: user?.name || '',
        contact: formatPhoneNumber(user?.contact) || '',
        shipTo: user?.shipTo || '',
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const formattedValue = id === 'contact' ? formatPhoneNumber(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: formattedValue,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [id]: '',
    }));
  };

  const uploadImage = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { image, email, name, contact, shipTo } = formData;

    const errors = {};
    if (!emailRegex.test(email)) {
      errors.email = '유효한 이메일 주소를 입력해 주세요.';
    }
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      errors.name = '이름은 한글이나 영어만 입력할 수 있습니다.';
    }
    const cleanedContact = contact.replace(/\D/g, '');
    if (cleanedContact.length !== 11) {
      errors.contact = '전화번호는 11자리 숫자여야 합니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await updateUser({ image, email, name, contact, shipTo });
    navigate('/account/profile');
  };

  const formatPhoneNumber = (value) => {
    let cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length > 11) {
      cleanValue = cleanValue.slice(0, 11);
    }
    const match = cleanValue.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);

    if (match) {
      const formattedValue = [match[1], match[2], match[3]]
        .filter(Boolean)
        .join('-');
      return formattedValue;
    }

    return cleanValue;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <HeadContainer>
          <Typography variant="h5">나의 정보</Typography>
          <Typography variant="subtitle1">회원정보 수정</Typography>
        </HeadContainer>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: '50px' }}>
        <ProfileContainer>
          <EditUserFormContainer onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ProfileImage>
                  <Typography variant="h6" sx={{ fontWeight: '600' }}>
                    프로필 이미지
                  </Typography>
                  <UploadImgArea>
                    <UploadImage
                      id="uploadedimage"
                      src={formData?.image === '' ? defaultProfile : formData?.image}
                      alt="uploadedimage"
                    />
                    <CloudinaryUploadWidget uploadImage={uploadImage} />
                  </UploadImgArea>
                </ProfileImage>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="이메일"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="name"
                  label="이름"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="contact"
                  label="연락처"
                  variant="outlined"
                  fullWidth
                  value={formData.contact}
                  onChange={handleChange}
                  error={!!formErrors.contact}
                  helperText={formErrors.contact}
                  sx={{ marginBottom: '16px' }}
                />
                <TextField
                  id="shipTo"
                  label="주소"
                  variant="outlined"
                  fullWidth
                  value={formData.shipTo}
                  onChange={handleChange}
                  error={!!formErrors.shipTo}
                  helperText={formErrors.shipTo}
                />
                <EditSubmitBtn
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  저장하기
                </EditSubmitBtn>
              </Grid>
            </Grid>
          </EditUserFormContainer>
        </ProfileContainer>
      </Grid>
    </Grid>
  );
};

export default MyProfileEditComponent;
