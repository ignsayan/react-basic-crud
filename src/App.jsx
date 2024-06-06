import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
    return (
        <>
            <div className="container my-4">
                <AppRoutes/>
            </div>
        </>
    )
}
