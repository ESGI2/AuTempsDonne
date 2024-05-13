import MaraudeStep from "./MaraudeStep.jsx";
import React, {useEffect, useState} from "react";
import ky from "ky";
import ClassicButton from "../Button/ClassicButton.jsx";
import download_img from "../../assets/images/download.svg";
import {Alert} from "react-bootstrap";

const MaraudeMap = ({information}) => {
    // State
    const [maraude, setMaraude] = useState([]);
    const [map, setMap] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const id = window.location.pathname.split("/")[2];



    // Effets
    useEffect(() => {
        setMaraude(information);
    }, [information]);
    

    // Comportements

    // async function getMap(){
    //     const id = window.location.pathname.split("/")[2];
    //     try {
    //         const response = await ky.get('http://autempsdonne.site:3000/wasabi/maraude/' + id, {
    //             credentials: 'include'
    //         });
    //         const data = await response.text(); // Appeler la méthode text() comme une fonction pour obtenir le texte
    //         // Extraire uniquement la partie de la carte qui vous intéresse
    //         const startIndex = data.indexOf('<div class="folium-map"');
    //         const endIndex = data.indexOf('</div>', startIndex) + '</div>'.length;
    //         const mapHTML = data.substring(startIndex, endIndex);
    //         setMap(mapHTML);
    //         console.log(mapHTML)
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function downloadMap(id) {
        try {
            // Appel de l'API pour récupérer le fichier
            console.log("Téléchargement de la carte...");
            setIsLoaded(true);
            const response = await fetch(`http://autempsdonne.site:3000/wasabi/maraude/${id}`);

            if (!response.ok) {
                throw new Error('Error downloading file');
            }

            const fileContent = await response.text();
            const blob = new Blob([fileContent], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `maraude_map_${id}.html`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setIsLoaded(false);
        } catch (error) {
            console.error('Error downloading map:', error);
            setError(error);
        }
    }



    if (!maraude) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (isLoaded) {
        // Affichage d'un message de chargement au centre de la page
        return (
            <div className="card d-flex justify-content-center align-items-center h-100">
                <p>Téléchargement de la carte..</p>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">Erreur : {error.message}</Alert>;
    }

    // Affichage
    // D'un coté, on affiche la map html, de l'autre on affiche un tableau avec la liste des points de distribution

    return (
        <div className="card w-100 h-100 d-flex flex-row">
            <div className="d-flex justify-content-center align-items-center">
                <MaraudeStep information={maraude.points}/>
                <ClassicButton onClick={() => {
                    downloadMap(id);
                }}>
                    <img src={download_img} alt="download" />
                    <p>Télécharger la carte</p>
                </ClassicButton>

            </div>
        </div>
    );
};

export default MaraudeMap;