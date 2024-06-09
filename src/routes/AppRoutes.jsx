import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
    Home,
    Login,
    PageNotFound,
    Register,
    VerifyEmailInfo,
    VerifyEmail,
    Users,

} from '../pages'

export const AppRoutes = () => {

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<PageNotFound />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/verify-email-info/:email/:code" element={<VerifyEmailInfo />} />
            <Route exact path="/verification/email" element={<VerifyEmail />} />\
            <Route exact path="/users" element={<Users />} />
        </Routes>
    )
}
