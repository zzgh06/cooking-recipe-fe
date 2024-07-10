import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import IngredientsDetail from "../pages/IngredientsDetail";
import PrivateRoute from "./PrivateRoute";
import MyFridge from "../pages/MyFridge";
import CartPage from "../pages/CartPage";
import PaymentPage from "../pages/PaymentPage";
import OrderCompletePage from "../pages/OrderCompletePage";
import MyPage from "../pages/MyPage";
import MyProfile from "../pages/MyProfile";
import AdminOrderPage from "../pages/AdminOrderPage";
import AdminIngredientsPage from "../pages/AdminIngredientsPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminRecipePage from "../pages/AdminRecipePage";
import StorePage from "../pages/StorePage";
import MyRecipePage from "../pages/MyRecipePage";

import RecipeDetailPage from "../pages/RecipeDetailPage";
import SearchResults from "../pages/SearchResults";
import FindPasswordPage from "../pages/FindPasswordPage";
import FindEmailPage from "../pages/FindEmailPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import VerifyCurrentPassword from "../pages/VerifyCurrentPassword";
import RecipePage from "../pages/Recipe/RecipePage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path="/ingredients/:id" element={<IngredientsDetail />} />
        <Route path="/recipes/all" element={<RecipePage />} />
        <Route path="/recipes/best" element={<RecipePage />} />
        <Route path="/recipes/new" element={<RecipePage />} />
        <Route path="/recipes/:category" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/fridge" element={<MyFridge />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />
          <Route path="/account/purchase" element={<MyPage />} />
          <Route path="/account/profile" element={<MyProfile />} />
          <Route
            path="/account/verify-current-password"
            element={<VerifyCurrentPassword />}
          />
          <Route
            path="/account/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/account/recipe" element={<MyRecipePage />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
        <Route element={<PrivateRoute permissionLevel="admin" />}>
          <Route path="/admin/recipe" element={<AdminRecipePage />} />
          <Route path="/admin/ingredients" element={<AdminIngredientsPage />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
          <Route path="/admin/user" element={<AdminUserPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
