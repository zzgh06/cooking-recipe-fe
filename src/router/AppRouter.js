import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RecipeDetail from '../pages/RecipeDetail'
import Ingredients from '../pages/Ingredients'
import PrivateRoute from './PrivateRoute'
import MyFridge from '../pages/MyFridge'
import CartPage from '../pages/CartPage' 
import PaymentPage from '../pages/PaymentPage'
import OrderCompletePage from '../pages/OrderCompletePage'
import MyPage from '../pages/MyPage'
import MyProfile from '../pages/MyProfile'
import AdminOrderPage from '../pages/AdminOrderPage'
import AdminProduct from '../pages/AdminProduct'
import AdminUserPage from '../pages/AdminUserPage'


const AppRouter = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/ingredients/:id" element={<Ingredients />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/fridge" element={<MyFridge />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage />} />
        <Route path="/account/profile" element={<MyProfile />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
        <Route path="/admin/user" element={<AdminUserPage />} />
      </Route>
    </Routes>
    <Footer />
    </>
  )
}

export default AppRouter