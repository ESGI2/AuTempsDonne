import { useEffect, useState } from 'react';
import LightNavbar from "../components/LightNavbar/LightNavbar.jsx";
import MaraudeInformations from "../components/Maraude/MaraudeInformations.jsx";
import ky from "ky";
import {Alert} from "react-bootstrap";
import TruckInformations from "../components/Maraude/TruckInformations.jsx";
import MaraudeProductData from "../components/Maraude/MaraudeProductData.jsx";

const MaraudeData = () => {
    // State
    const [maraude, setMaraude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        getMaraudeInformations(id)
            .then((data) => {
                setMaraude(data); //
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    // Comportement
    async function getMaraudeInformations(id) {
        try {
            const response = await ky.get(`http://localhost:3000/maraude/${id}`, {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        } catch (error) {
            throw new Error('Erreur lors de la récupération des informations de la maraude : ' + error.message);
        }
    }

    // Affichage
    return (
        <div className="d-flex">
            <LightNavbar />
            <div className="w-100 h-100">
                {error && <Alert variant="danger">{error}</Alert>}
                <MaraudeInformations information={maraude}/>
                <TruckInformations information={maraude}/>
                <MaraudeProductData information={maraude}/>
            </div>
        </div>
    );
};

export default MaraudeData;
