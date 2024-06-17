import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import Navbar from '../component/Navbar'

const AppRouter = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
    </>
  )
}

export default AppRouter