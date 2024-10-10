import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/img/profile_user.png";
import { useUpdateUser } from "../../hooks/User/useUpdateUser";
import { User } from "../../types";

interface FormErrors {
  email: string;
  name: string;
  contact: string;
  shipTo: string;
}

interface EditableUserInfo {
  image: string;
  email: string;
  name: string;
  contact: string;
  shipTo: string;
}

interface MyProfileEditComponentProps {
  user: User;
}

const MyProfileEditComponent = ({ user }: MyProfileEditComponentProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EditableUserInfo>({
    image: "",
    email: "",
    name: "",
    contact: "",
    shipTo: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    name: "",
    contact: "",
    shipTo: "",
  });

  const { mutate: updateUser, isPending } = useUpdateUser();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (user) {
      setFormData({
        image: user.image || '',
        email: user.email || '',
        name: user.name || '',
        contact: formatPhoneNumber(user.contact || '') || '',
        shipTo: user.shipTo || '',
      });
    }
  }, [user]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const uploadImage = (url: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { image, email, name, contact, shipTo } = formData;

    const errors: Partial<FormErrors> = {};
    if (!emailRegex.test(email)) {
      errors.email = '유효한 이메일 주소를 입력해 주세요.';
    }
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      errors.name = '이름은 한글이나 영어만 입력할 수 있습니다.';
    }
    const cleanedContact = contact?.replace(/\D/g, '');
    if (cleanedContact?.length !== 11) {
      errors.contact = '전화번호는 11자리 숫자여야 합니다.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors as FormErrors);;
      return;
    }

    await updateUser({ image, email, name, contact, shipTo });
    navigate('/account/profile');
  };

  const formatPhoneNumber = (value: string): string => {
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
    <div className="container mx-auto px-4">
        <div className="mb-6">
        <div className="flex justify-start items-baseline border-b-4 border-black">
          <h5 className="text-2xl font-semibold">나의 정보</h5>
          <p className="ml-4 text-lg">회원정보 수정</p>
        </div>

        <form className="bg-white shadow-none p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-[60px] justify-center"> 
            <div className="flex flex-col items-center">
              <h6 className="font-semibold text-[22px] my-3">프로필 이미지</h6>
              <div className="flex flex-col items-start">
                <img
                  id="uploadedimage"
                  src={formData?.image === "" ? defaultProfile : formData?.image}
                  alt="uploadedimage"
                  className="w-[200px] h-[200px] object-cover mb-2 rounded-full border-2 border-gray-300"
                />
                <CloudinaryUploadWidget uploadImage={uploadImage} />
              </div>
            </div>

            <div className="w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full mt-1 p-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full mt-1 p-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">연락처</label>
                <input
                  id="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`block w-full mt-1 p-3 border ${formErrors.contact ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.contact && <p className="text-red-500 text-sm">{formErrors.contact}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="shipTo" className="block text-sm font-medium text-gray-700">주소</label>
                <input
                  id="shipTo"
                  type="text"
                  value={formData.shipTo}
                  onChange={handleChange}
                  className={`block w-full mt-1 p-3 border ${formErrors.shipTo ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {formErrors.shipTo && <p className="text-red-500 text-sm">{formErrors.shipTo}</p>}
              </div>

              <button
                type="submit"
                className="block w-36 mx-auto mt-4 p-2 bg-blue-500 text-white font-medium rounded"
                disabled={isPending}
              >
                저장하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfileEditComponent;
