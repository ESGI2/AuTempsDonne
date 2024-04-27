import React, { useEffect, useState } from "react";
import ky from "ky";

export default function PersonnalCalendarSelection({ onSelectPerson }) {
    const [volunteers, setVolunteers] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState("");

    async function getVolunteers() {
        try {
            const response = await ky.get(`http://localhost:3000/user/volunteers`, {
                credentials: "include",
            });
            const data = await response.json();
            setVolunteers(data.volunteers);
        } catch (error) {
            console.error('Erreur lors de la récupération des volontaires:', error);
            throw error;
        }
    }

    useEffect(() => {
        getVolunteers();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedPerson(event.target.value);
        onSelectPerson(event.target.value);
    };

    return (
        <div>
            <select value={selectedPerson} onChange={handleSelectChange}>
                <option value="">Calendrier général</option>
                {
                    (volunteers.length > 0) && volunteers.map(volunteers => {
                        return (
                            <option key={volunteers.id} value={volunteers.id}>
                                {volunteers.first_name} {volunteers.last_name}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}
