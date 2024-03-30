import React from "react";
import materiels from "../../assets/img/materiels.png";
import aliments from "../../assets/img/aliments.png";
import hygiene from "../../assets/img/hygiene.png";
import { useLocation } from "react-router-dom";
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from "../../assets/lang/lang_en.json";

function Don() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;

    return (
        <>
            <div className="mt-5 " style={{ marginLeft: "15%", marginRight: "15%" }}>
                <h1>{lang.don.titre}</h1>
                <p>{lang.don.paragraphe}</p>
            </div>


            <div className="flex-container mb-5 mt-5" style={{ display: "flex", justifyContent: "space-evenly", marginLeft: "15%", marginRight: "15%", boxShadow: "rgba(0, 0, 0, 5) 0px 4px 20px " }}>
                <div className="list-container mt-5">
                    <img src={materiels} alt="Matériels" />
                    <h2 className=" mt-3">{lang.categories.materiels.titre}</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {lang.categories.materiels.items.map((item, index) => (
                            <li key={index} className="mt-3">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="list-container mt-5">
                    <img src={aliments} alt="Aliments" />
                    <h2 className=" mt-3">{lang.categories.aliments.titre}</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {lang.categories.aliments.items.map((item, index) => (
                            <li key={index} className="mt-3">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="list-container mt-5">
                    <img src={hygiene} alt="Hygiène" />
                    <h2 className=" mt-3">{lang.categories.hygiene.titre}</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {lang.categories.hygiene.items.map((item, index) => (
                            <li key={index} className="mt-3">{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Don;
