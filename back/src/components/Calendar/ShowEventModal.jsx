import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ky from "ky";
import AssignationPersonnesModal from '../AssignationPersonnesModal/AssignationPersonnesModal';
import ClassicButton from "../Button/ClassicButton.jsx";
import DeleteButton from "../Button/DeleteButton.jsx";
import CancelButton from "../Button/CancelButton.jsx"; // Import du modal d'assignation

export default function ShowEventModal({ show, handleClose, event }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const [showAssignationModal, setShowAssignationModal] = useState(false); // État pour gérer l'affichage du modal d'assignation

    async function deleteEvent(id) {
        return ky.delete(`http://autempsdonne.site:3000/event/${id}`, {
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
                    <ClassicButton onClick={() => setShowAssignationModal(true)}>Assigner</ClassicButton>
                    <DeleteButton onClick={() => deleteEvent(event.id)}>Supprimer</DeleteButton>
                    <CancelButton onClick={handleClose}>Fermer</CancelButton>
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
