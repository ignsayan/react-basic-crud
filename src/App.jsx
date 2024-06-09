import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthState } from './contexts/authentication';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components';

export default function App() {

    return (
        <>
            <AuthState>
                <Navbar />
                <AppRoutes />
            </AuthState>
        </>
    )
}
