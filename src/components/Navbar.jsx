import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts/authentication';
import useAxios from '../hooks/useAxios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const auth = useContext(AuthContext);
    const { response, error, loading, apiHandler } = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
        }
    }, [auth.isAuthenticated])

    const handleLogout = () => {

        apiHandler({
            url: '/api/logout',
            headers: {
                'Authorization': `Bearer ${Cookies.get('access_token')}`
            },
            method: 'POST',
        })

        Cookies.remove('access_token');
        localStorage.removeItem('user');
        auth.dispatch();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Container>
                    <a className="navbar-brand" href="/">{import.meta.env.VITE_APP_NAME}</a>
                    {
                        !auth.isAuthenticated
                            ? <Button variant="light" href='/login'>Login</Button>
                            : <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    }
                </Container>
            </nav>
        </>
    )
}
