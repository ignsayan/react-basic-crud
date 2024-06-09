import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authentication'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthOutlet() {

    const auth = useContext(AuthContext);

    return (
        auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}
