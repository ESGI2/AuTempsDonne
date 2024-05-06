import React, { useState, useEffect } from 'react';
import ky from 'ky';
import DeliveryModal1 from './DeliveryModal1';
import CreateWaypointModal from './CreateWaypointModal.jsx';

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

const getAllTruck = () => {
    return ky.get("http://localhost:3000/truck", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const getAllDeliveryDriver = () => {
    return ky.get("http://localhost:3000/deliveryDrivers", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const getUserById = (id) => {
    return ky.get(`http://localhost:3000/user?id=${id}`, {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const getDeliveryListing = (deliveryId) => {
    return ky.get(`http://localhost:3000/DeliveryListing/${deliveryId}`, {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const getDeliveryPoint = () => {
    return ky.get(`http://localhost:3000/DeliveryPoint`, {
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

const getStatusText = (status) => {
    switch (status) {
        case 0:
            return "À venir";
        case 1:
            return "En cours";
        case 2:
            return "Terminé";
        default:
            return "Inconnu";
    }
};

const Delivery = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [trucks, setTrucks] = useState([]);
    const [users, setUsers] = useState([]);
    const [departurePoints, setDeparturePoints] = useState([]);
    const [arrivalPoints, setArrivalPoints] = useState([]);
    const [deliveryPoints, setDeliveryPoints] = useState([]);

    useEffect(() => {
        getAllDelivery().then(data => setDeliveries(data));
        getAllTruck().then(data => setTrucks(data));
        getAllDeliveryDriver().then(async drivers => {
            const usersArray = [];
            for (const driver of drivers) {
                const userResponse = await getUserById(driver.id_user);
                usersArray.push(userResponse.users);
            }
            setUsers(usersArray);
        });
        getDeliveryPoint().then(data => setDeliveryPoints(data));
    }, []);

    useEffect(() => {
        const fetchPoints = async () => {
            const departureArray = [];
            const arrivalArray = [];
            for (const delivery of deliveries) {
                const points = await getDeliveryListing(delivery.id);
                for (const point of points) {
                    const deliveryPoint = deliveryPoints.find(dp => dp.id === point.id_point);
                    if (point.isDeparture) {
                        departureArray.push(deliveryPoint);
                    } else if (point.isArrival) {
                        arrivalArray.push(deliveryPoint);
                    }
                }
            }
            setDeparturePoints(departureArray);
            setArrivalPoints(arrivalArray);
        };
        fetchPoints();
    }, [deliveries, deliveryPoints]);

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        console.log(modalOpen)
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [createWaypointModalOpen, setCreateWaypointModalOpen] = useState(false); // État pour le nouveau modal

    const openCreateWaypointModal = () => {
        setCreateWaypointModalOpen(true);
    };

    const closeCreateWaypointModal = () => {
        setCreateWaypointModalOpen(false);
    };

    return (

        <div>
            {modalOpen && <DeliveryModal1 onClose={closeModal}/>}
            {createWaypointModalOpen && <CreateWaypointModal onClose={closeCreateWaypointModal}/>} {/* Nouveau modal */}
            <div>
                <button className="btn btn-primary" onClick={openModal}>Ouvrir le Modal</button>
                <button className="btn btn-primary" onClick={openCreateWaypointModal}>Créer un point de passage</button> {/* Bouton pour ouvrir le nouveau modal */}
            </div>

            <table className="min-w-full">
                <thead>
                <tr className="w-full" style={{backgroundColor: '#CECFCF'}}>
                    <th className="py-2.5 px-3 text-left">ID Delivery</th>
                    <th className="py-2.5 px-3 text-left">Truck Name</th>
                    <th className="py-2.5 px-3 text-left">User First Name</th>
                    <th className="py-2.5 px-3 text-left">Departure Point</th>
                    <th className="py-2.5 px-3 text-left">Arrival Point</th>
                    <th className="py-2.5 px-3 text-left">Heure de début</th>
                    <th className="py-2.5 px-3 text-left">Heure de fin</th>
                    <th className="py-2.5 px-3 text-left">Status</th> {/* Nouvelle colonne */}
                </tr>
                </thead>
                <tbody>
                {deliveries.map((delivery, index) => (
                    <tr key={index}>
                        <td className="py-2.5 px-3">{delivery.id}</td>
                        <td className="py-2.5 px-3">{trucks[index]?.name}</td>
                        <td className="py-2.5 px-3">{users[index]?.first_name}</td>
                        <td className="py-2.5 px-3">{departurePoints[index]?.name}</td>
                        <td className="py-2.5 px-3">{arrivalPoints[index]?.name}</td>
                        <td className="py-2.5 px-3">{formatDate(delivery.departure)}</td>
                        <td className="py-2.5 px-3">{formatDate(delivery.theoretical_arrival)}</td>
                        <td className="py-2.5 px-3">{getStatusText(delivery.status)}</td> {/* Affichage du statut */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Delivery;
