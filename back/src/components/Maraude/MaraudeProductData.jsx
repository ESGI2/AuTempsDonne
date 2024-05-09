import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ClassicButton from "../Button/ClassicButton.jsx";

const MaraudeProductData = ({information}) => {
    // State
    const [maraude, setMaraude] = useState(null);

    // Effets
    useEffect(() => {
        setMaraude(information);
        console.log(information)
    }, [information]);


    // Comportements







    if (!maraude) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    // Affichage

    // Je veux un tableau récapitulatif des produits de la maraude avec les informations suivantes : id, nom, type, quantité
    return (

        <>
            <div className="overflow-x-auto rounded-t-lg pt-3">
                <h5 className="card-title text-center pb-3">Informations sur les produits</h5>
                <table className="divide-y-2 divide-gray-200 bg-white text-sm ">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace nowrap px-4 py-2 font-medium text-gray-900">Id</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nom</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Type</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantité</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {maraude.product.map((product, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{product?.id}</td>
                            <td className="px-4 py-2">{product?.name}</td>
                            <td className="px-4 py-2">{product?.type}</td>
                            <td className="px-4 py-2">{product?.quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>


                                </>

                                );
                            };

export default MaraudeProductData;