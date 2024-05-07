import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import ky from "ky";

const getDeliveryPoint = () => {
    return ky.get(`http://localhost:3000/DeliveryPoint`, {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const CreateWaypointModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        city: '',
        postal_code: '',
        road: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données du formulaire soumises :', formData);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer un point de passage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Form.Label>Pays</Form.Label>
                        <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="postal_code">
                        <Form.Label>Code Postal</Form.Label>
                        <Form.Control type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="road">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" name="road" value={formData.road} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Créer
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWaypointModal;
