import React, {useEffect, useState} from 'react';
const MaraudeInformations = ({information}) => {

    // State
    const [maraude, setMaraude] = useState(null);

    useEffect(() => {
        setMaraude(information);
    }, [information]);


    // Comportements

    const toLocalDate = (date) => {
      return new Date(date).toLocaleString();
    }

    if (!maraude) {
        return (
            <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        )
    }

    return (
        <div className="card maraude-informations-container">
        <div className="card-body">
                <h5 className="card-title text-center">Informations de la maraude</h5>
                <div className="card-text">
                    <p><strong>Id :</strong> {maraude.event?.id}</p>
                    <p><strong>Titre :</strong> {maraude.event?.title}</p>
                    <p><strong>Description :</strong> {maraude.event?.description}</p>
                    <p><strong>Début :</strong> {toLocalDate(maraude.event?.start)}</p>
                    <p><strong>Fin :</strong> {toLocalDate(maraude.event?.end)}</p>
                </div>
            </div>
        </div>
    );};

export default MaraudeInformations;