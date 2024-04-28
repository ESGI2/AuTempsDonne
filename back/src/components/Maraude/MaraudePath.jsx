import React from 'react';
import {Button, Modal, ModalFooter} from "react-bootstrap";

const MaraudePath = () => {
    return (
        <>

        <Modal>
            <Modal.Header>
                <Modal.Title>Chemin de la maraude</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Point de départ</p>
                <p>Point d'arrivée</p>
                <p>Points de distribution</p>
            </Modal.Body>
            <ModalFooter>
                <Button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Terminer</Button>
            </ModalFooter>
        </Modal>

        </>
    );
};

export default MaraudePath;