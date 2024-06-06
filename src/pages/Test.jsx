import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

function Register() {
    const [validated, setValidated] = useState(false);
    const { response, error, loading, apiHandler } = useAxios();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);
            const body = {
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                email: event.target.email.value,
                password: event.target.password.value,
                password_confirmation: event.target.password_confirmation.value
            }

            apiHandler({
                url: '/api/register',
                method: 'POST',
                data: body,
            });

        }

    };
    useEffect(() => {
        if (response) {
            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success(response.msg);
        } else {
            toast.error(error?.msg);
        }
    }, [response, error])
    return (
        <Container>
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
                                    required
                                    type="text"
                                    placeholder="First name"
                                    defaultValue="Mark"
                                    name='first_name'
                                />
                                <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>

                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    defaultValue="Otto"
                                    name='last_name'
                                />
                                <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        name='email'
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid email address.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="number" name='phone' placeholder="Phone" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name='password' type="password" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control name='password_confirmation' type="password" placeholder="Zip" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid confirm password.
                                </Form.Control.Feedback>
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