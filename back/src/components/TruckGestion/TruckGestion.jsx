import React, { useState, useEffect } from 'react';
import ky from 'ky';

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

const EditTrucksLocalisation = (id , localisation) => {
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

    useEffect(() => {
        getAllTrucks().then(data => {
            setTrucks(data);
        });
    }, []);

    const handleSubmit = (event, id) => {
        event.preventDefault();
        EditTrucksLocalisation(id, newLocalisation)
            .then(() => {
                // Rafraîchir la liste des camions après modification de la localisation
                getAllTrucks().then(data => {
                    setTrucks(data);
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la modification de la localisation du camion :', error);
            });
    };

    return (
        <div>
            <h2>Liste des camions</h2>
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
