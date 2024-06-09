import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Authenticator() {

    const isLoggedIn = () => {
        return Cookies.get('access_token') ? true : false
    }

    return (
        isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
    )
}
