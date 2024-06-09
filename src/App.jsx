import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { AuthState } from './contexts/authentication';
import { AppRoutes } from './routes/AppRoutes';

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
