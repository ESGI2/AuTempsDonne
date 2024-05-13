import React, { useState, useEffect } from 'react';
import ky from 'ky';
import PointDistributionModal from "./PointDistributionModal.jsx";
import NewMaraudeModal from "./NewMaraudeModal.jsx";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import ClassicButton from "../Button/ClassicButton.jsx";
// import EditMaraudeModal from './EditMaraudeModal.jsx';

function getUpcomingMaraudes() {
    return ky.get('http://autempsdonne.site:3000/maraude', {
        credentials: 'include'
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = '/';
        } else {
            return response.json();
        }
    });
}

const Maraude = () => {
    const [maraudes, setMaraudes] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [selectedMaraude, setSelectedMaraude] = useState(null);

    useEffect(() => {
        getUpcomingMaraudes().then((data) => {
            setMaraudes(data);
        });
    }, []);

    const openModal = (maraude, modal) => {
        if (modal === 'edit') {
            setSelectedMaraude(maraude);
            setShowModal('edit');
        } else if (modal === 'new') {
            setShowModal('new');
        } else if (modal === 'point') {
            setShowModal('point');
        }
    };

    const closeModal = () => {
        setShowModal(null);
        updateMaraudeList();
    };

    const updateMaraudeList = () => {
        getUpcomingMaraudes().then((data) => {
            setMaraudes(data);
        });
    };

    return (
        <div className="rounded-lg border border-gray-200">
            {/*{(showModal === 'edit') && <EditMaraudeModal maraude={selectedMaraude} onClose={closeModal} />}*/}
            {(showModal === 'new') && <NewMaraudeModal closeModal={closeModal} />}
            {(showModal === 'point') && <PointDistributionModal show={true} handleClose={closeModal} />}
            <h1 className="text-2xl font-semibold text-gray-900 px-4 py-6 text-center">Prochaines maraudes</h1>
            <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Camion</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Événement</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {maraudes.map((maraude) => (
                        <tr key={maraude.id}>
                            <td className="whitespace nowrap px-4 py-2 font-medium text-gray-900">{maraude.id}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{maraude.truck}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{maraude.event}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                <Link to={`/maraude/${maraude.id}`}>
                                    <ClassicButton>Voir</ClassicButton>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 d-f flex-column">
                <ClassicButton onClick={() => openModal(null, 'new')}>
                    Nouvelle maraude
                </ClassicButton>
                <ClassicButton onClick={() => openModal(null, 'point')}>
                    Points de distribution
                </ClassicButton>

            </div>
        </div>
    );
};

export default Maraude;
