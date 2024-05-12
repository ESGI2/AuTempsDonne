import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import ky from 'ky';

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

export default function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedAgenda, setSelectedAgenda] = useState('Mon agenda');

    // Fonction pour récupérer l'utilisateur actuel
    const getMe = async () => {
        try {
            const response = await ky.get("http://localhost:3000/user/me", {
                credentials: "include",
            });
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                const { me } = await response.json();
                return me;
            }
        } catch (error) {
            throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
    };

    const fetchEventsByPerson = async (personId) => {
        try {
            const response = await ky.get(`http://localhost:3000/event/user/${personId}`, {
                credentials: "include"
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    const fetchAllEvents = async () => {
        try {
            const response = await ky.get('http://localhost:3000/event', {
                credentials: "include"
            });
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const user = await getMe();
                if (user) {
                    if (selectedAgenda === 'Mon agenda') {
                        await fetchEventsByPerson(user.id);
                    } else {
                        await fetchAllEvents();
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des événements:', error);
            }
        };
        fetchEvents();
    }, [selectedAgenda]);

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDropdownChange = (event) => {
        setSelectedAgenda(event.target.value);
    };

    return (
        <div className="my-calendar w-75 m-auto" style={{ backgroundColor: "white" }}>
            <Dropdown className="mb-3">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedAgenda}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedAgenda('Mon agenda')}>Mon agenda</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedAgenda('Agenda commun')}>Agenda commun</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                eventClick={handleEventClick}
            />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Détails de l'événement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p><strong>Titre:</strong> {selectedEvent.title}</p>
                            <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
                            <p><strong>Date de début:</strong> {formatDate(selectedEvent.start)}</p>
                            <p><strong>Date de fin:</strong> {formatDate(selectedEvent.end)}</p>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
