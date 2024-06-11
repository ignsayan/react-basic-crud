import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {
    AuthOutlet,
    GuestOutlet
} from '../components/outlets'

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
            {/* scope for public routes */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="*" element={<PageNotFound />} />

            {/* scope for guest routes */}
            <Route element={<GuestOutlet />}>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/verify-email-info/:email/:code" element={<VerifyEmailInfo />} />
                <Route exact path="/verification/email" element={<VerifyEmail />} />
            </Route>

            {/* scope for auth routes */}
            <Route element={<AuthOutlet />}>
                <Route exact path="/users" element={<Users />} />
            </Route>
        </Routes>
    )
}
