import React, { useState, useEffect } from 'react';
import ky from 'ky';

const DeliveryHomePage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [events, setEvents] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [deliveryPoints, setDeliveryPoints] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [intermediateModalIsOpen, setIntermediateModalIsOpen] = useState(false);
    const [newPointModalIsOpen, setNewPointModalIsOpen] = useState(false);
    const [selectedIntermediatePoints, setSelectedIntermediatePoints] = useState('');
    const [newPointFormData, setNewPointFormData] = useState({
        name: '',
        country: '',
        city: '',
        postal_code: '',
        road: ''
    });

    useEffect(() => {
        getAllDelivery().then(data => setDeliveries(data));
        getAllEvent().then(data => setEvents(data));
        getAllWarehouse().then(data => setWarehouses(data));
        getAllDeliveryPoints().then(data => setDeliveryPoints(data.filter(point => point.type === 'point')));
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

    const addDeliveryPointAPI = () => {
        const formData = { ...newPointFormData, type: "point" };

        return ky.post("http://localhost:3000/deliveryPoint", {
            credentials: "include",
            json: formData
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to add delivery point');
            } else {
                return response.json();
            }
        });
    };


    const getAllDeliveryPoints = () => {
        return ky.get("http://localhost:3000/deliveryPoint", {
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

    const openIntermediateModal = () => {
        setIntermediateModalIsOpen(true);
    };

    const closeIntermediateModal = () => {
        setIntermediateModalIsOpen(false);
    };

    const openNewPointModal = () => {
        setNewPointModalIsOpen(true);
    };

    const closeNewPointModal = () => {
        setNewPointModalIsOpen(false);
    };

    const handleCreateDelivery = () => {
        // Votre logique pour créer une livraison
        closeModal();
    };

    const handleCheckboxChange = (event) => {
        const pointId = event.target.value;
        if (event.target.checked) {
            setSelectedIntermediatePoints(prevState => prevState ? prevState + ',' + pointId : pointId);
        } else {
            setSelectedIntermediatePoints(prevState => prevState.split(',').filter(id => id !== pointId).join(','));
        }
    };

    const handleNewPointFormChange = (event) => {
        const { name, value } = event.target;
        setNewPointFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateNewPoint = () => {
        addDeliveryPointAPI()
            .then(() => {
                closeNewPointModal();
            })
            .catch(error => {
                closeNewPointModal();
                console.error('Error creating delivery point:', error);

            });
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>
                Créer une livraison
            </button>

            {/* Modal pour créer une livraison */}
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
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary" onClick={openIntermediateModal}>Point intermédiaire</button>
                                </div>
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour les points intermédiaires */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: intermediateModalIsOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Points intermédiaires</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeIntermediateModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {deliveryPoints.map((point) => (
                                <div key={point.id} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={point.id} id={`point-${point.id}`} onChange={handleCheckboxChange} />
                                    <label className="form-check-label" htmlFor={`point-${point.id}`}>
                                        {point.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={openNewPointModal}>Ajouter un point intermédiaire</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour ajouter un nouveau point intermédiaire */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: newPointModalIsOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajouter un point intermédiaire</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeNewPointModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Nom:</label>
                                    <input type="text" className="form-control" name="name" value={newPointFormData.name} onChange={handleNewPointFormChange} />
                                </div>
                                <div className="form-group">
                                    <label>Pays:</label>
                                    <input type="text" className="form-control" name="country" value={newPointFormData.country} onChange={handleNewPointFormChange} />
                                </div>
                                <div className="form-group">
                                    <label>Ville:</label>
                                    <input type="text" className="form-control" name="city" value={newPointFormData.city} onChange={handleNewPointFormChange} />
                                </div>
                                <div className="form-group">
                                    <label>Code postal:</label>
                                    <input type="text" className="form-control" name="postal_code" value={newPointFormData.postal_code} onChange={handleNewPointFormChange} />
                                </div>
                                <div className="form-group">
                                    <label>Rue:</label>
                                    <input type="text" className="form-control" name="road" value={newPointFormData.road} onChange={handleNewPointFormChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleCreateNewPoint}>Créer</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau des livraisons */}
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
