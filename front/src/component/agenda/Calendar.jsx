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
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserInEvent, setIsUserInEvent] = useState(false);
    const [message, setMessage] = useState('');

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
                setCurrentUser(user); // Mettre à jour l'utilisateur actuel
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

    const handleJoinEvent = async () => {
        if (currentUser && selectedEvent) {
            try {
                await assignPersonToEvent(currentUser.id, selectedEvent.id);
                // Rafraîchir les événements après l'assignation de la personne
                if (selectedAgenda === 'Mon agenda') {
                    await fetchEventsByPerson(currentUser.id);
                } else {
                    await fetchAllEvents();
                }
                setShowModal(false);
                setIsUserInEvent(true); // Mettre à jour l'état pour indiquer que l'utilisateur est maintenant dans l'événement
                setMessage('Vous êtes déjà inscrit à cet événement.');
            } catch (error) {
                console.error('Erreur lors de l\'assignation de la personne à l\'événement:', error);
            }
        }
    };

    useEffect(() => {
        const checkUserInEvent = async () => {
            if (currentUser && selectedEvent) {
                try {
                    const response = await ky.get(`http://localhost:3000/eventListing/checkUserInEvent`, {
                        credentials: "include",
                        searchParams: {
                            id_event: selectedEvent.id,
                            id_user: currentUser.id
                        }
                    });
                    const data = await response.json();
                    setIsUserInEvent(data);
                    if (data) {
                        setMessage('Vous êtes déjà inscrit à cet événement.');
                    } else {
                        setMessage('');
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification de l\'inscription de l\'utilisateur à l\'événement:', error);
                }
            }
        };
        checkUserInEvent();
    }, [currentUser, selectedEvent]);

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
                <Modal.Footer>
                    {message && <p>{message}</p>}
                    {!message && !isUserInEvent && (
                        <Button variant="primary" onClick={handleJoinEvent}>Rejoindre l'événement</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

async function assignPersonToEvent(personId, eventId) {
    try {
        await ky.post(`http://localhost:3000/eventListing`, {
            credentials: "include",
            json: {
                id_event: eventId,
                id_user: personId
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'assignation de la personne à l\'événement:', error);
        throw error;
    }
}
