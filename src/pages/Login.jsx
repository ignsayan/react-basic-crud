import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';
import Loader from "react-js-loader";
import Cookies from 'js-cookie';
import { AuthContext } from '../contexts/authentication';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { response, error, loading, apiHandler } = useAxios();
    const [body, setBody] = useState({
        email: '',
        password: ''
    });
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        apiHandler({
            url: '/api/login',
            method: 'POST',
            data: body,
        });
    }
    useEffect(() => {
        if (response) {
            Cookies.set('access_token', response.data.bearer_token, {
                secure: true,
                sameSite: 'strict'
            });
            const { bearer_token, ...user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            auth.dispatch();
            navigate('/users');
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])

    return (
        <Container>
            <ToastContainer position='bottom-center' />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} />
                : <div className='row justify-content-center'>
                    <div className='col-md-12 text-center'>
                        <h1>Login</h1>
                        <hr />
                    </div>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={body.email}
                                onChange={(e) => setBody({ ...body, email: e.target.value })} />
                            {error?.errors?.email && <Form.Text className="text-danger">{error?.errors?.email[0]}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={body.password}
                                onChange={(e) => setBody({ ...body, password: e.target.value })} />
                            {error?.errors?.password && <Form.Text className="text-danger">{error?.errors?.password}</Form.Text>}
                        </Form.Group>

                        <Button variant="dark" type="submit">Login</Button>
                    </Form>
                </div>
            }
        </Container>
    )
}
