import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeliveryModal1 = ({ onClose }) => {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Crée une livraison</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Contenu du modal ici...</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-primary" onClick={onClose}>
                    Exit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeliveryModal1;
