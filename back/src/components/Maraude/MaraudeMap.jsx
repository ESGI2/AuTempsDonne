import MaraudeStep from "./MaraudeStep.jsx";
import React, {useEffect, useState} from "react";
import ky from "ky";

const MaraudeMap = ({information}) => {
    // State
    const [maraude, setMaraude] = useState([]);
    const [map, setMap] = useState("");



    // Effets
    useEffect(() => {
        setMaraude(information);
        getMap();
    }, [information]);
    

    // Comportements

    async function getMap(){
        const id = window.location.pathname.split("/")[2];
        try {
            const response = await ky.get('http://localhost:3000/wasabi/maraude/' + id, {
                credentials: 'include'
            });
            const data = await response.text(); // Appeler la méthode text() comme une fonction pour obtenir le texte
            setMap(data);
            // Extraire uniquement la partie de la carte qui vous intéresse
            const startIndex = data.indexOf('<div class="folium-map"');
            const endIndex = data.indexOf('</div>', startIndex) + '</div>'.length;
            const mapHTML = data.substring(startIndex, endIndex);
            console.log(mapHTML)
        } catch (error) {
            console.error(error);
        }
    }


    if (!maraude) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    // Affichage
    // D'un coté, on affiche la map html, de l'autre on affiche un tableau avec la liste des points de distribution

    return (
        <div className="card w-100 h-100 d-flex flex-row">
            <div className="w-50 d-flex justify-content-center align-items-center">
                <MaraudeStep information={maraude.points}/>
            </div>
            {map && <div dangerouslySetInnerHTML={{__html: map}}/>}
        </div>
    );
};

export default MaraudeMap;