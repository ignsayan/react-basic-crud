import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';
import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { response, error, loading, apiHandler } = useAxios();
    const [body, setBody] = useState({
        email: '',
        password: ''
    });

    const handleLogin = (e) => {
        e.preventDefault();
        apiHandler({
            url: '/api/login',
            method: 'POST',
            data: body,
        });
    }

    useEffect(() => {
        if (response) {
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success(response.msg);
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])

    return (
        <>
            {
                loading
                    ? <Loader type="hourglass" bgColor="#212529" size={100} />
                    : <div>
                        <Form>
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

                            <Button variant="dark" type="submit"
                                onClick={handleLogin}>Login</Button>
                        </Form>
                        <ToastContainer />

                        {/* for temporary checking purpose only */}
                        {localStorage.getItem('user') && (
                            <pre className='mt-3'>
                                {JSON.stringify(JSON.parse(localStorage.getItem('user')), null, 2)}
                            </pre>
                        )}
                    </div>
            }
        </>
    )
}
