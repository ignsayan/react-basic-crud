import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authentication'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuestOutlet() {

    const auth = useContext(AuthContext);

    return (
        auth.isAuthenticated ? <Navigate to="/users" /> : <Outlet />
    )
}
