// MaraudeContent.jsx
import React from 'react';
import { Modal } from "react-bootstrap";
import CancelButton from "../Button/CancelButton.jsx";
import ValidateButton from "../Button/ValidateButton.jsx";

const MaraudeContent = ({ closeModal }) => {

    const handleClose = () => {
        closeModal();
    }

    const handleCancel = () => {
        closeModal(1); // Revenir au step 1
    }

    return (
        <Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Créer une maraude</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Contenu de la maraude</p>
            </Modal.Body>
            <Modal.Footer>
                <ValidateButton onClick={handleClose}>Valider</ValidateButton>
                <CancelButton onClick={handleCancel}>Annuler</CancelButton>
            </Modal.Footer>
        </Modal>
    );
}

export default MaraudeContent;
