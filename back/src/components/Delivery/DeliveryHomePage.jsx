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
    const [deliveryFormData, setDeliveryFormData] = useState({
        title: '',
        description: '',
        date_start: '',
        date_end: '',
        road_start: '',
        road_end: '',
        road_inter: '',
        truck: '2'
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

    const addDelivery = (formData) => {
        return ky.post("http://localhost:3000/delivery", {
            credentials: "include",
            json: formData
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to add delivery');
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

    async function downloadMap(id) {
        try {
            console.log("Téléchargement de la carte...");
            const response = await fetch(`http://localhost:3000/wasabi/delivery/${id}`);

            if (!response.ok) {
                throw new Error('Error downloading file');
            }

            const fileContent = await response.text();
            const blob = new Blob([fileContent], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `delivery_map${id}.html`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading map:', error);
        }
    }


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

    const handleCreateDelivery = (event) => {
        event.preventDefault();

        // Format road_inter as comma-separated IDs
        const formattedFormData = {
            ...deliveryFormData,
            road_inter: selectedIntermediatePoints
        };

        // Ajouter la livraison
        addDelivery(formattedFormData);
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

    const handleDeliveryFormChange = (event) => {
        const { name, value } = event.target;
        setDeliveryFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={openModal}>
                Créer une livraison
            </button>

            {/* Modal pour créer une livraison */}
            <div className="modal" tabIndex="-1" role="dialog" style={{display: modalIsOpen ? 'block' : 'none'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Créer une livraison</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleCreateDelivery}>
                                <div className="form-group">
                                    <label>Titre:</label>
                                    <input type="text" className="form-control" name="title"
                                           value={deliveryFormData.title} onChange={handleDeliveryFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" name="description"
                                           value={deliveryFormData.description} onChange={handleDeliveryFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Date de début:</label>
                                    <input type="datetime-local" className="form-control" name="date_start"
                                           value={deliveryFormData.date_start} onChange={handleDeliveryFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Date de fin:</label>
                                    <input type="datetime-local" className="form-control" name="date_end"
                                           value={deliveryFormData.date_end} onChange={handleDeliveryFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Point de départ:</label>
                                    <select className="form-control" name="road_start"
                                            value={deliveryFormData.road_start} onChange={handleDeliveryFormChange}>
                                        <option value="">Sélectionner un point de départ</option>
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id_delivery_point} value={warehouse.id_delivery_point}>
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Point d'arrivée:</label>
                                    <select className="form-control" name="road_end" value={deliveryFormData.road_end}
                                            onChange={handleDeliveryFormChange}>
                                        <option value="">Sélectionner un point d'arrivé</option>
                                        {warehouses.map((warehouse) => (
                                            <option key={warehouse.id_delivery_point} value={warehouse.id_delivery_point}>
                                                {warehouse.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary"
                                            onClick={openIntermediateModal}>Point intermédiaire
                                    </button>
                                </div>
                                <button type="submit" className="btn btn-primary">Créer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour les points intermédiaires */}
            <div className="modal" tabIndex="-1" role="dialog"
                 style={{display: intermediateModalIsOpen ? 'block' : 'none'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Points intermédiaires</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={closeIntermediateModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {deliveryPoints.map((point) => (
                                <div key={point.id} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={point.id}
                                           id={`point-${point.id}`} onChange={handleCheckboxChange}/>
                                    <label className="form-check-label" htmlFor={`point-${point.id}`}>
                                        {point.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={openNewPointModal}>Ajouter un
                                point intermédiaire
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour ajouter un nouveau point intermédiaire */}
            <div className="modal" tabIndex="-1" role="dialog"
                 style={{display: newPointModalIsOpen ? 'block' : 'none'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajouter un point intermédiaire</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={closeNewPointModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Nom:</label>
                                    <input type="text" className="form-control" name="name"
                                           value={newPointFormData.name} onChange={handleNewPointFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Pays:</label>
                                    <input type="text" className="form-control" name="country"
                                           value={newPointFormData.country} onChange={handleNewPointFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Ville:</label>
                                    <input type="text" className="form-control" name="city"
                                           value={newPointFormData.city} onChange={handleNewPointFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Code postal:</label>
                                    <input type="text" className="form-control" name="postal_code"
                                           value={newPointFormData.postal_code} onChange={handleNewPointFormChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Rue:</label>
                                    <input type="text" className="form-control" name="road"
                                           value={newPointFormData.road} onChange={handleNewPointFormChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleCreateNewPoint}>Créer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tableau des livraisons */}
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                <tr className="w-full bg-gray-200">
                    <th className="py-2.5 px-3 text-left border border-gray-200">ID Delivery</th>
                    <th className="py-2.5 px-3 text-left border border-gray-200">ID Truck</th>
                    <th className="py-2.5 px-3 text-left border border-gray-200">Date de début</th>
                    <th className="py-2.5 px-3 text-left border border-gray-200">Date de fin</th>
                    <th className="py-2.5 px-3 text-left border border-gray-200">Titre</th>
                    <th className="py-2.5 px-3 text-left border border-gray-200">Download</th>
                </tr>
                </thead>
                <tbody>
                {deliveries.map((delivery, index) => {
                    const matchingEvent = events.find(event => event.id === delivery.id_event);
                    return (
                        <tr key={index} className="bg-white border border-gray-200">
                            <td className="py-2.5 px-3 border border-gray-200">{delivery.id}</td>
                            <td className="py-2.5 px-3 border border-gray-200">{delivery.id_truck}</td>
                            <td className="py-2.5 px-3 border border-gray-200">{matchingEvent ? formatDate(matchingEvent.start) : ''}</td>
                            <td className="py-2.5 px-3 border border-gray-200">{matchingEvent ? formatDate(matchingEvent.end) : ''}</td>
                            <td className="py-2.5 px-3 border border-gray-200">{matchingEvent ? matchingEvent.title : ''}</td>
                            <td className="py-2.5 px-3 border border-gray-200">
                                <button className="btn btn-primary" onClick={() => downloadMap(delivery.id)}>
                                    Télécharger
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

        </div>
    );

};

export default DeliveryHomePage;
