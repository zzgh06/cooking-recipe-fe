import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CircularProgress from '@mui/material/CircularProgress'; 

// Lazy load the pages
const MainPage = lazy(() => import("../pages/MainPage"));
const StorePage = lazy(() => import("../pages/StorePage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Authentication pages
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const FindPasswordPage = lazy(() => import("../pages/FindPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/ResetPasswordPage"));
const ChangePasswordPage = lazy(() => import("../pages/ChangePasswordPage"));
const VerifyCurrentPassword = lazy(() => import("../pages/VerifyCurrentPassword"));

// User-related pages
const MyFridge = lazy(() => import("../pages/MyFridge"));
const CartPage = lazy(() => import("../pages/CartPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const OrderCompletePage = lazy(() => import("../pages/OrderCompletePage"));
const MyProfile = lazy(() => import("../pages/MyProfile"));
const MyRecipePage = lazy(() => import("../pages/MyRecipePage"));
const SearchResults = lazy(() => import("../pages/SearchResults"));

// Ingredient and Recipe pages
const IngredientsDetail = lazy(() => import("../pages/IngredientsDetail"));
const RecipePage = lazy(() => import("../pages/Recipe/RecipePage"));
const RecipeDetail = lazy(() => import("../pages/Recipe/RecipeDetailPage"));

// Admin pages
const AdminOrderPage = lazy(() => import("../pages/AdminOrderPage"));
const AdminIngredientsPage = lazy(() => import("../pages/AdminIngredientsPage"));
const AdminUserPage = lazy(() => import("../pages/AdminUserPage"));
const AdminRecipePage = lazy(() => import("../pages/AdminRecipePage"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f0f0f0'
        }}>
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        {/* Common pages */}
        <Route path="/" element={<MainPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/account/verify-current-password" element={<VerifyCurrentPassword />} />
        <Route path="/account/change-password" element={<ChangePasswordPage />} />

        {/* Ingredient and Recipe routes */}
        <Route path="/ingredients/:id" element={<IngredientsDetail />} />
        <Route path="/ingredients" element={<IngredientsDetail />} />
        <Route path="/recipes/all" element={<RecipePage />} />
        <Route path="/recipes/best" element={<RecipePage />} />
        <Route path="/recipes/new" element={<RecipePage />} />
        <Route path="/recipes/:category" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />

        {/* User-related routes with PrivateRoute */}
        <Route element={<PrivateRoute permissionLevel="customer" />}>
          <Route path="/fridge" element={<MyFridge />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/success" element={<OrderCompletePage />} />
          <Route path="/account/profile" element={<MyProfile />} />
          <Route path="/account/recipe" element={<MyRecipePage />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>

        {/* Admin routes with PrivateRoute */}
        <Route element={<PrivateRoute permissionLevel="admin" />}>
          <Route path="/admin/recipe" element={<AdminRecipePage />} />
          <Route path="/admin/ingredients" element={<AdminIngredientsPage />} />
          <Route path="/admin/order" element={<AdminOrderPage />} />
          <Route path="/admin/user" element={<AdminUserPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
