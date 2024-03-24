import React from "react";
import materiels from "../../assets/img/materiels.png";
import aliments from "../../assets/img/aliments.png";
import hygiene from "../../assets/img/hygiene.png";

function Don() {
    return (
        <>
            <div className="mt-5 " style={{marginLeft : "15%" , marginRight : "15%"}}>
                <h1>Comment nous aider</h1>
                <a>Vous pouvez tout d’abord partager nos réseaux sociaux afin de faire connaître nos actions. En outre, vous pouvez faire du bénévolat en rejoignant la grande famille AU TEMPS DONNE. Vous pouvez également  réaliser des dons (financiers, alimentaires, hygiènes, matériels). Ci-dessous une liste non-exhausive des produits que nous collectons :</a>
            </div>


            <div className="flex-container mb-5 mt-5" style={{display: "flex" ,justifyContent: "space-evenly" ,marginLeft : "15%" , marginRight : "15%" , boxShadow : "rgba(0, 0, 0, 5) 0px 4px 20px " }}>
                <div className="list-container mt-5">
                    <img src={materiels}/>
                    <h2  className=" mt-3">Matériels</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li className=" mt-3">Barquettes en aluminium</li>
                        <li>Gobelets en plastique</li>
                        <li>Fourchettes et cuillères en plastique</li>
                        <li>Touillettes</li>
                        <li>Serviettes en papier</li>
                        <li>Gants en plastique</li>
                        <li>Sacs poubelle</li>
                        <li>Gels Hydro-alcoolique</li>
                        <li>Masques</li>
                        <li>Lingettes nettoyantes</li>
                        <li>Sachet en plastique</li>
                    </ul>
                </div>

                <div className="list-container mt-5">
                    <img src={aliments} />
                    <h2 className=" mt-3">Aliments</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li className=" mt-3">Café</li>
                        <li>Pâtes</li>
                        <li>Oeuf</li>
                        <li>Riz</li>
                        <li>Poulet</li>
                        <li>Jus d’orange</li>
                        <li>Sauce tomate</li>
                        <li>Baguette</li>
                        <li>Sauce</li>
                        <li>Bouteille d’eau</li>
                        <li>Sucre</li>
                        <li>Thon</li>
                    </ul>
                </div>

                <div class="list-container mt-5">
                    <img src={hygiene}/>
                    <h2  className=" mt-3">Hygiène</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li className=" mt-3">Rasoir</li>
                        <li>Coupe-ongles</li>
                        <li>Brosse à dent</li>
                        <li>Savon</li>
                        <li>Dentifrice</li>
                        <li>Gel douche</li>
                        <li>Shampoing</li>
                        <li>Mouchoir</li>
                        <li>Serviette hygiénique</li>
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Don;
