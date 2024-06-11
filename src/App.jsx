import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthState } from './contexts/authentication';
import { AppRoutes } from './routes/AppRoutes';
import NavBar from './components/NavBar';

export default function App() {

    return (
        <>
            <AuthState>
                <NavBar />
                <AppRoutes />
            </AuthState>
        </>
    )
}
