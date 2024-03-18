import React from 'react';
import banner from "../../assets/img/banner.png";
import momkids from "../../assets/img/momkids.png";
import asso1 from "../../assets/img/asso1.png";
import asso2 from "../../assets/img/asso2.png";
import asso3 from "../../assets/img/asso3.png";
import asso4 from "../../assets/img/asso4.png";
import './home.css';
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <div style={{ overflow: "auto" }}>
                <div id="carouselExampleCaptions" className="carousel slide ml-auto mr-md-5">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={banner} className="d-block w-100" style={{ maxHeight: "400px" }} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={momkids} className="mt-5 rounded float-start" />
                        </div>
                        <div className="col-md-6">
                            <div id="Nouscoco" className="mt-lg-5">
                                <h1 className="display-5"><b>Nous connaître</b></h1>
                                <p>AU TEMPS DONNE lutte contre <mark>l'isolement</mark> des personnes précaires. En ce sens, nous développons un lien social basé sur <mark>l’écoute</mark> et le <mark>dialogue.</mark></p>
                                <p>Nous réalisons des <mark>maraudes</mark> sociales à Paris. À cette occasion, nos équipes distribuent café, thé, sandwich et produits d’hygiène.</p>
                                <p>Les distributions nous permettent de pouvoir amorcer une <mark>conversation</mark> et ainsi créer un <mark>échange convivial</mark>.</p>
                                <p>L’objectif étant d’être <mark>présent</mark>, d’échanger sur divers sujets mais surtout de <mark>créer un lien de confiance</mark> au fil des maraudes.</p>
                                <button className="button">
                                    <p style={{textDecoration:"none"}}><Link to="/mission">NOS MISSIONS</Link></p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-lg-5 bg-warning-subtle">
                    <h1 className="display-5"><b>Nos partenaires</b></h1>
                    <div className="row row-cols-4">
                        <div className="col order-first"><img src={asso1} alt="asso1" /></div>
                        <div className="col"><img src={asso2} alt="asso2" /></div>
                        <div className="col"><img src={asso3} alt="asso3" /></div>
                        <div className="col order-last"><img src={asso4} alt="asso4" /></div>
                    </div>
                </div>
                <div id="Nousreje" className="mt-lg-5 text-center mx-auto">
                    <h1 className="display-3"><b>On recrute ! </b></h1>
                    <p>Agissez maintenant</p>
                    <p>Notre force devient plus importante à travers l’action collective.</p>
                    <p>Vous aussi, faites la différence avec AU TEMPS DONNE !</p>
                    <p>Le soutien que nous recevons contribue à renforcer nos efforts pour résoudre les problèmes de société.</p>
                    <p>Contactez-nous dès aujourd’hui et rejoignez-nous pour agir concrètement.</p>
                    <button className="button">
                        <p>NOUS REJOINDRE</p>
                    </button>
                </div>
                <div className="container mt-5 mb-5">
                    <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.4252194424103!2d3.2663266768230304!3d49.85325663018251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e818f421f465bf%3A0x95ab756da5e0559a!2sAssociation%20MultiCit%C3%A9%20-%20Centre%20Social%20du%20Vermandois!5e0!3m2!1sfr!2sfr!4v1710741072140!5m2!1sfr!2sfr" width="100%" height="500" style={{ border: "0" }}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    );
}

export default Home;
