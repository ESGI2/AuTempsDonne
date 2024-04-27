import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ky from "ky";
import AssignationPersonnesModal from '../AssignationPersonnesModal/AssignationPersonnesModal'; // Import du modal d'assignation

export default function ShowEventModal({ show, handleClose, event }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const [showAssignationModal, setShowAssignationModal] = useState(false); // État pour gérer l'affichage du modal d'assignation

    async function deleteEvent(id) {
        return ky.delete(`http://localhost:3000/event/${id}`, {
            credentials: "include",
        }).then((response) => {
            if (response.status === 200) {
                handleClose();
            }
        });
    }


    return (
        <>
            {/* Modal d'affichage de l'événement */}
            <Modal show={show && !showAssignationModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails de l'événement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {event && (
                        <>
                            <p><strong>Titre:</strong> {event.title}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Date de début:</strong> {formatDate(event.start)}</p>
                            <p><strong>Date de fin:</strong> {formatDate(event.end)}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-between">
                    <button onClick={() => setShowAssignationModal(true)} className="btn btn-primary">Assigner</button> {/* Bouton pour ouvrir le modal d'assignation */}
                    <button onClick={() => deleteEvent(event.id)} className="btn btn-danger">Supprimer</button>
                    <button onClick={handleClose} className="btn btn-secondary">Fermer</button>
                </Modal.Footer>
            </Modal>

            {/* Modal d'assignation des personnes */}
            {showAssignationModal && (
                <AssignationPersonnesModal
                    show={showAssignationModal}
                    eventId={event.id}
                    handleClose={() => setShowAssignationModal(false)}
                />
            )}
        </>
    );
}
