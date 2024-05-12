import { useState } from 'react';
import {Container, Form, Button, Alert} from 'react-bootstrap';
import ky from 'ky';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements[0].value;
        const password = e.target.elements[1].value;

        try {
            const response = await ky.post('http://localhost:3000/login', {
                json: {email, password},
                credentials: 'include'
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                if (data.Role === "admin") {
                    window.location.href = "/users";
                } else {
                    setError("Vous n'êtes pas autorisé à accéder à cette page");
                }
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (error) {
            setError("Email ou mot de passe incorrect");
        }

    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px'}}>
            <h2 className="text-center mb-5" style={{color: '#5B83A6', fontSize: '2rem'}}>Panel administrateur</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="mb-4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="mb-5"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" style={{color: '#5B83A6', fontSize: '1.5rem'}}>
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
