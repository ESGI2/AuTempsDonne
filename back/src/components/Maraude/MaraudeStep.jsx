import React, {useEffect, useState} from 'react';

const MaraudeStep = ({information}) => {
    // State
    const [points, setPoints] = useState([]);


    // Effets

    useEffect(() => {
        setPoints(information);
    }, [information]);

    // Comportements



    if (!points) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    // Affichage

    return (
        <div className="overflow-x-auto rounded-t-lg pt-3">
            <h5 className="card-title text-center pb-3">Etape de la maraude</h5>
            <table className="divide-y-2 divide-gray-200 bg-white text-sm ">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace nowrap px-4 py-2 font-medium text-gray-900">Etape</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nom</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Id point</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {points.map((point, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{point.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{point.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default MaraudeStep;