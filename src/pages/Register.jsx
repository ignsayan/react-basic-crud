import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import useAxios from '../hooks/useAxios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const { response, error, loading, apiHandler } = useAxios();
    const [body, setBody] = useState({});

    const onChangeHandler = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value })
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            event.preventDefault();

            apiHandler({
                url: '/api/register',
                method: 'POST',
                data: body,
            });

        }
        setValidated(true);

    };
    useEffect(() => {
        if (response) {
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success(response.msg);
            navigate('/verify-email-info');
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])
    return (
        <Container>
            <ToastContainer />
            {loading
                ? <Loader type="hourglass" bgColor="#212529" size={100} /> :
                <div className='row justify-content-center'>
                    <div className='col-md-12 text-center'>
                        <h1>Register</h1>
                        <hr />
                    </div>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    
                                    type="text"
                                    placeholder="First name"
                                    defaultValue={body.first_name}
                                    name='first_name'
                                    onChange={(e) => onChangeHandler(e)}
                                />
                                {error?.errors?.first_name ? <Form.Text className='text-danger'>{error?.errors?.first_name[0]}</Form.Text> :
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a first name.
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    defaultValue={body.last_name}
                                    name='last_name'
                                    onChange={(e) => onChangeHandler(e)}

                                />
                                {error?.errors?.last_name ? <Form.Text className='text-danger'>{error?.errors?.last_name[0]}</Form.Text> :
                                    <Form.Control.Feedback type="invalid">
                                        Please center last name.
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Email</Form.Label>
                                
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        name='email'
                                        defaultValue={body.email}
                                        onChange={(e) => onChangeHandler(e)}

                                    />
                                    {error?.errors?.email ? <Form.Text className='text-danger'>{error?.errors?.email[0]}</Form.Text> :
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a valid email address.
                                        </Form.Control.Feedback>
                                    }
                                
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" name='phone_no' placeholder="Phone" required 
                                    onChange={(e) => onChangeHandler(e)}
                                    defaultValue={body.phone_no}
                                />
                                {error?.errors?.phone_no ? <Form.Text className='text-danger'>{error?.errors?.phone_no[0]}</Form.Text> :
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid phone number.
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' type="password" placeholder="State" required 
                                    onChange={(e) => onChangeHandler(e)}
                                />
                                {error?.errors?.password ? <Form.Text className='text-danger'>{error?.errors?.password[0]}</Form.Text> :
                                    <Form.Control.Feedback type="invalid">
                                        Password is required.
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name='password_confirmation' type="password" placeholder="Confirm Password" required 
                                    onChange={(e) => onChangeHandler(e)}
                                />
                                {error?.errors?.password_confirmation ? <Form.Text className='text-danger'>{error?.errors?.password_confirmation[0]}</Form.Text> :
                                    <Form.Control.Feedback type="invalid">
                                        Confirm Password is required.
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                        </Row>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </div>
            }
        </Container>
    );
}

export default Register;