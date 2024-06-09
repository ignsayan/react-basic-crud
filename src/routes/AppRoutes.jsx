import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Authenticator from '../components/Authenticator'
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
            {/* space for public routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<PageNotFound />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/verify-email-info/:email/:code" element={<VerifyEmailInfo />} />
            <Route exact path="/verification/email" element={<VerifyEmail />} />

            {/* space for protected routes */}
            <Route element={<Authenticator />}>
                <Route exact path="/users" element={<Users />} />
            </Route>
        </Routes>
    )
}
