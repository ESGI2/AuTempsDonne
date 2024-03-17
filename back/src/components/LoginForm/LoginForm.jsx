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

        const json = await ky.post('http://localhost:3000/login', {
            json: { email, password }
        }).json();

        if (json.Role === "admin") {
            alert("Vous êtes connecté")
            // window.location.href = "/admin";
        } else {
            setError("Email ou mot de passe incorrect");
        }

    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px'}}>
            <h2 className="text-center mb-5" style={{color: '#5B83A6'}}>Panel administrateur</h2>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
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

                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;
