import React, { useState } from 'react';
import ky from "ky";

const AddTruck = async (name, localisation, plaque_immatriculation) => {
    const queryString = `?name=${name}&localisation=${localisation}&plaque_immatriculation=${plaque_immatriculation}`;
    try {
        const response = await ky.post(`http://localhost:3000/truck${queryString}`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error('Failed to add stock');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding stock:', error);
        throw error;
    }
};

const AddTruckModal = ({ onClose }) => {
    const [newTruckName, setNewTruckName] = useState('');
    const [newTruckPlaque, setNewTruckPlaque] = useState('');
    const [newTruckLocalisation, setNewTruckLocalisation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AddTruck(newTruckName, newTruckLocalisation, newTruckPlaque);
            onClose();
        } catch (error) {
            console.error('Error adding truck:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-lg font-bold mb-4">Ajouter un camion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="truckName" className="block text-sm font-medium text-gray-700">Nom du camion :</label>
                        <input type="text" id="truckName" name="truckName" value={newTruckName} onChange={(e) => setNewTruckName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="truckPlaque" className="block text-sm font-medium text-gray-700">Immatriculation :</label>
                        <input type="text" id="truckPlaque" name="truckPlaque" value={newTruckPlaque} onChange={(e) => setNewTruckPlaque(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="truckLocalisation" className="block text-sm font-medium text-gray-700">Localisation :</label>
                        <input type="text" id="truckLocalisation" name="truckLocalisation" value={newTruckLocalisation} onChange={(e) => setNewTruckLocalisation(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                    </div>
                    <div className="mt-8">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Ajouter</button>
                        <button type="button" onClick={onClose} className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTruckModal;
