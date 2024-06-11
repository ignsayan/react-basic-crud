import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts/authentication';
import useAxios from '../hooks/useAxios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const auth = useContext(AuthContext);
    const { response, error, loading, apiHandler } = useAxios();
    const navigate = useNavigate();

    const handleLogout = () => {

        apiHandler({
            url: '/api/logout',
            method: 'POST',
        })
            .finally(() => {
                Cookies.remove('access_token');
                localStorage.removeItem('user');
                auth.dispatch();
                navigate('/login');
            })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Container>
                    <a className="navbar-brand" href="/">Home</a>
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
