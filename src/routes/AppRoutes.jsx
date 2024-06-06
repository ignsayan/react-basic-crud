import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import {Login, PageNotFound, Register, VerifyEmailInfo} from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/verify-email-info" element={<VerifyEmailInfo />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
