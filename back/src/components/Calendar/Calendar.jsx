import React, {useEffect, useState} from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ky from "ky";
import NewEventModal from "./NewEventModal.jsx";

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useState([])
    const [modal, setModal] = useState(false)

    function openModal() {
        setModal(true);
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



    useEffect(() => {
        fetchEvents();
    }, []);


    return (
        <div className='w-75 m-auto'>
            <div>
                <NewEventModal show={modal} handleClose={closeModal} handleShow={openModal} />
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
                    // editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={currentEvents}
                    // select={}
                    eventContent={renderEventContent} // custom render function
                    // eventClick={handleEventClick}
                    // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                />
                {/*    New event button*/}
                <div className="">
                    <button className="btn btn-primary px-3 py-2 mt-2" onClick={() => openModal()}>New event</button>
                </div>
            </div>

        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    )
}