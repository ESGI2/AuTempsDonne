import React, { useState } from "react";

const AssignInput = ({ volunteer, onAdd }) => {
    const [selectedPerson, setSelectedPerson] = useState("");

    const handleAdd = () => {
        if (selectedPerson) {
            onAdd(selectedPerson);
            setSelectedPerson("");
        }
    };

    return (
        <div className="form-group mb-4">
            {
                (volunteer.length === 0) && (
                    <div className="alert alert-info">
                        <p>Aucun volontaire n'est disponible pour cet event</p>
                    </div>
                )
            }
            <label htmlFor="volunteerSelect">Assigner un volontaire :</label>
            <div className="form-group mb-4 d-flex align-items-center">
                <select
                    id="volunteerSelect"
                    className="form-control me-2"
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(e.target.value)}
                >
                    <option value="">Choisir un volontaire</option>
                    {volunteer.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.first_name} {person.last_name}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={handleAdd}>Ajouter</button>
            </div>
        </div>
    );
};

export default AssignInput;
