import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserInfo from "../component/UserInfo/UserInfo";
import MyOrderComponent from "../component/MyOrderComponent/MyOrderComponent";
import MyProfileEditComponent from "../component/MyProfileEditComponent/MyProfileEditComponent";
import MyRecipeComponent from "../component/MyRecipeComponent/MyRecipeComponent";
import VerifyCurrentPassword from "./VerifyCurrentPassword";
import ChangePasswordPage from "./ChangePasswordPage";
import MyGroceryNote from "../component/MyGroceryNote/MyGroceryNote";
import { useLoginWithToken } from "../hooks/User/useLoginWithToken";
import { RootState } from "../redux/store";

const MyProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<string>("내 주문");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { mutate: fetchUser } = useLoginWithToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchUser(); 
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchUserData();
  }, [fetchUser]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigate("/login"); 
    }
  }, []);

  const handleButtonClick = (value: string) => {
    setCurrentView(value);
    setIsVerified(false);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "내 레시피":
        return <MyRecipeComponent />;
      case "내 주문":
        return <MyOrderComponent />;
      case "장보기 메모":
        return <MyGroceryNote />;
      case "회원정보 수정":
        return user ? <MyProfileEditComponent user={user} /> : <p>사용자 정보를 불러올 수 없습니다.</p>;
      case "비밀번호 수정":
        return isVerified ? (
          <ChangePasswordPage />
        ) : (
          <VerifyCurrentPassword onVerifySuccess={handleVerificationSuccess} />
        );
      default:
        return <MyOrderComponent />;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          {user ? (
            <UserInfo onButtonClick={handleButtonClick} user={user} />
          ) : (
            <p className="text-gray-600 italic">사용자 정보를 불러올 수 없습니다.</p>
          )}
        </div>
        <div className="col-span-12 lg:col-span-9">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
