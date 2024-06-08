import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import {Login, PageNotFound, Register, VerifyEmailInfo, VerifyEmail} from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/verify-email-info/:email/:code" element={<VerifyEmailInfo />} />
        <Route path="/verification/email" element={<VerifyEmail />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
