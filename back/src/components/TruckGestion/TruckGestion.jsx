import React, { useState, useEffect } from 'react';
import ky from 'ky';
import TruckModal from './AddTruckModal.jsx';

const getAllTrucks = () => {
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

const EditTrucksLocalisation = (id, localisation) => {
    return ky.patch(`http://localhost:3000/truck/?id=${id}&localisation=${localisation}`, {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
};

const TruckGestion = () => {
    const [trucks, setTrucks] = useState([]);
    const [newLocalisation, setNewLocalisation] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAllTrucks().then(data => {
            setTrucks(data);
        });
    }, []);

    const handleSubmit = (event, id) => {
        event.preventDefault();
        EditTrucksLocalisation(id, newLocalisation)
            .then(() => {
                getAllTrucks().then(data => {
                    setTrucks(data);
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la modification de la localisation du camion :', error);
            });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAddTruck = () => {
        setShowModal(true);
    };

    return (
        <div>
            <div>
                <button onClick={handleAddTruck} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Ajouter un camion</button>
                {showModal && <TruckModal onClose={closeModal} onAdd={() => {
                    getAllTrucks().then(data => {
                        setTrucks(data);
                    });
                }} />}
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Plaque</th>
                    <th>Localisation</th>
                    <th>Modifier localisation</th>
                </tr>
                </thead>
                <tbody>
                {trucks.map(truck => (
                    <tr key={truck.id}>
                        <td>{truck.id}</td>
                        <td>{truck.name}</td>
                        <td>{truck.plaque_immatriculation}</td>
                        <td>{truck.localisation}</td>
                        <td>
                            <form onSubmit={(event) => handleSubmit(event, truck.id)}>
                                <input
                                    type="text"
                                    value={newLocalisation}
                                    onChange={(event) => setNewLocalisation(event.target.value)}
                                />
                                <button type="submit">Modifier</button>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TruckGestion;
