import React, { useState, useEffect } from 'react';
import ky from 'ky';

const DeliveryModal1 = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [departurePoint, setDeparturePoint] = useState('');
    const [arrivalPoint, setArrivalPoint] = useState('');
    const [warehouseList, setWarehouseList] = useState([]);

    useEffect(() => {
        getAllWarehouse().then(data => setWarehouseList(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour créer une livraison
        onClose(); // Ferme le modal après la création de la livraison
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Créer une livraison</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titre:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Date de début:</label>
                        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Date de fin:</label>
                        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Point de départ:</label>
                        <select value={departurePoint} onChange={(e) => setDeparturePoint(e.target.value)}>
                            <option value="">Sélectionner un point de départ</option>
                            {warehouseList.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Point d'arrivée:</label>
                        <select value={arrivalPoint} onChange={(e) => setArrivalPoint(e.target.value)}>
                            <option value="">Sélectionner un point d'arrivée</option>
                            {warehouseList.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Créer</button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryModal1;
