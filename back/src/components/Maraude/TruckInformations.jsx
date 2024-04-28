import React, {useEffect, useState} from 'react';

const TruckInformations = ({information}) => {
    // State
    const [maraude, setMaraude] = useState(null);

    // Effets
    useEffect(() => {
        setMaraude(information);
    }, [information]);


    // Comportements


    if (!maraude) {
        return <div>Loading...</div>;
    }

    // Affichage
    return (
        <div className="card maraude-informations-container">
            <div className="card-body">
                <h5 className="card-title text-center">Informations sur le camion</h5>
                <div className="card-text">
                    <p><strong>Id :</strong> {maraude.event?.id}</p>
                    <p><strong>Titre :</strong> {maraude.event?.title}</p>
                    <p><strong>Description :</strong> {maraude.event?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default TruckInformations;