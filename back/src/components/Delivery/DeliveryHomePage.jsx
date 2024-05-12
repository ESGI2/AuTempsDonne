import React, { useState, useEffect } from 'react';
import ky from 'ky';

const DeliveryHomePage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [events, setEvents] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        getAllDelivery().then(data => setDeliveries(data));
        getAllEvent().then(data => setEvents(data));
        getAllWarehouse().then(data => setWarehouses(data));
    }, []);

    const getAllDelivery = () => {
        return ky.get("http://localhost:3000/delivery", {
            credentials: "include",
        }).then((response) => {
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                return response.json();
            }
        });
    };

    const getAllEvent = () => {
        return ky.get("http://localhost:3000/event/", {
            credentials: "include",
        }).then((response) => {
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                return response.json();
            }
        });
    };

    const getAllWarehouse = () => {
        return ky.get("http://localhost:3000/warehouse", {
            credentials: "include",
        }).then((response) => {
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                return response.json();
            }
        });
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCreateDelivery = () => {
        // Votre logique pour créer une livraison
        closeModal();
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>
                Créer une livraison
            </button>

            <div className="modal" tabIndex="-1" role="dialog" style={{ display: modalIsOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Créer une livraison</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateDelivery}>
                                <div className="form-group">
                                    <label>Titre:</label>
                                    <input type="text" className="form-control" name="title" />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" name="description" />
                                </div>
                                <div className="form-group">
                                    <label>Date de début:</label>
                                    <input type="datetime-local" className="form-control" name="start" />
                                </div>
                                <div className="form-group">
                                    <label>Date de fin:</label>
                                    <input type="datetime-local" className="form-control" name="end" />
                                </div>
                                <div className="form-group">
                                    <label>Point de départ:</label>
                                    <select className="form-control" name="departurePoint">
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id} value={warehouse.id}>
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Point d'arrivée:</label>
                                    <select className="form-control" name="arrivalPoint">
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id} value={warehouse.id}>
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <table className="min-w-full">
                <thead>
                <tr className="w-full" style={{ backgroundColor: '#CECFCF' }}>
                    <th className="py-2.5 px-3 text-left">ID Delivery</th>
                    <th className="py-2.5 px-3 text-left">ID Truck</th>
                    <th className="py-2.5 px-3 text-left">Date de début</th>
                    <th className="py-2.5 px-3 text-left">Date de fin</th>
                    <th className="py-2.5 px-3 text-left">Titre</th>
                </tr>
                </thead>
                <tbody>
                {deliveries.map((delivery, index) => {
                    const matchingEvent = events.find(event => event.id === delivery.id_event);
                    return (
                        <tr key={index}>
                            <td className="py-2.5 px-3">{delivery.id}</td>
                            <td className="py-2.5 px-3">{delivery.id_truck}</td>
                            <td className="py-2.5 px-3">{matchingEvent ? formatDate(matchingEvent.start) : ''}</td>
                            <td className="py-2.5 px-3">{matchingEvent ? formatDate(matchingEvent.end) : ''}</td>
                            <td className="py-2.5 px-3">{matchingEvent ? matchingEvent.title : ''}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryHomePage;
