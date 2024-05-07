import React, { useEffect, useState } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ky from "ky";
import NewEventModal from "./NewEventModal.jsx";
import ShowEventModal from "./ShowEventModal.jsx";
import ActivityModal from "./ActivityModal.jsx";
import PersonnalCalendarSelection from "./PersonnalCalendarSelection.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [modal, setModal] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedPersonId, setSelectedPersonId] = useState("");

    function openModal(modalType) {
        switch (modalType) {
            case 'new':
                setModal('new');
                break;
            case 'show':
                setModal('show');
                break;
            case 'activity':
                setModal('activity');
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
            setCurrentEvents(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    }

    async function fetchEventsByPerson(personId){
        try {
            console.log("Récupération des événements pour la personne", personId)
            const response = await ky.get(`http://localhost:3000/event/user/${personId}`, {
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
        const clickedEvent = info.event;
        setSelectedEvent(clickedEvent);
        openModal("show");
    }

    const handlerPersonSelect = (personId) => {
        setSelectedPersonId(personId);
        if (personId === "") {
            fetchEvents();
        } else {
            fetchEventsByPerson(personId);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className='w-75 m-auto'>
            <PersonnalCalendarSelection onSelectPerson={handlerPersonSelect}/>
            <div>
                {modal === 'new' && <NewEventModal show={true} handleClose={closeModal}/>}
                {modal === 'show' && <ShowEventModal show={true} handleClose={closeModal} event={selectedEvent}/>}
                {modal === 'activity' && <ActivityModal show={true} handleClose={closeModal}/>}
                <FullCalendar
                    contentHeight={500}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    titleFormat={{year: 'numeric', month: 'long', day: 'numeric'}}
                    initialView='dayGridMonth'
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={currentEvents}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                />
                <div className="d-flex">
                    <div className="p-2">
                        <ClassicButton onClick={() => openModal("new")}>
                            New event
                        </ClassicButton>
                    </div>
                    <div className="p-2">
                        <ClassicButton onClick={() => openModal("activity")}>
                            Activities
                        </ClassicButton>
                    </div>
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
)
    ;
}
