import React, { useEffect, useState } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ky from "ky";
import NewEventModal from "./NewEventModal.jsx";
import ShowEventModal from "./ShowEventModal.jsx"; // Import du ShowEventModal

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [modal, setModal] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    function openModal(modalType) {
        switch (modalType) {
            case 'new':
                setModal('new');
                break;
            case 'show':
                setModal('show');
                break;
            default:
                setModal("");
        }
    }

    function closeModal() {
        setModal(false);
        fetchEvents();
    }

    async function fetchEvents(){
        try {
            const response = await ky.get('http://localhost:3000/event', {
                credentials: "include"
            });
            const data = await response.json();
            console.log(data)
            setCurrentEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    }

    function handleEventClick(info) {
        // Récupérer les informations de l'événement sélectionné
        const clickedEvent = info.event;
        console.log(info.event)
        setSelectedEvent(clickedEvent);
        openModal("show");
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className='w-75 m-auto'>
            <div>
                {modal === 'new' && <NewEventModal show={true} handleClose={closeModal} />}
                {modal === 'show' && <ShowEventModal show={true} handleClose={closeModal} event={selectedEvent} />}
                <FullCalendar
                    contentHeight={600}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
                    initialView='dayGridMonth'
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={currentEvents}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                />
                <div className="">
                    <button className="btn btn-primary px-3 py-2 mt-2" onClick={() => openModal("new")}>New event</button>
                </div>
            </div>

        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
