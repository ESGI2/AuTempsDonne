import React from 'react';
import banner from "../../assets/img/banner.png";
import momkids from "../../assets/img/momkids.png";
import asso1 from "../../assets/img/asso1.png";
import asso2 from "../../assets/img/asso2.png";
import asso3 from "../../assets/img/asso3.png";
import asso4 from "../../assets/img/asso4.png";
import './home.css';
import {Link, useLocation} from "react-router-dom";
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from "../../assets/lang/lang_en.json";


function Home() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;

    return (
        <>
            <div style={{ overflow: "auto" }}>
                <div id="carouselExampleCaptions" className="carousel slide ml-auto mr-md-5">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={banner} className="d-block w-100" style={{ maxHeight: "400px" }} alt="Banner" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={momkids} className="mt-5 rounded float-start" alt="Mom with kids" />
                        </div>
                        <div className="col-md-6">
                            <div id="Nouscoco" className="mt-lg-5">
                                <h1 className="display-5"><b>{lang.home.nous_connaitre.titre}</b></h1>
                                <p>{lang.home.nous_connaitre.paragraphe1}</p>
                                <p>{lang.home.nous_connaitre.paragraphe2}</p>
                                <p>{lang.home.nous_connaitre.paragraphe3}</p>
                                <p>{lang.home.nous_connaitre.paragraphe4}</p>
                                <Link to={`/${lang}/mission`}><button className="button">
                                    <p>{lang.home.nous_connaitre.bouton_missions}</p>
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-lg-5 bg-warning-subtle">
                    <h1 className="display-5"><b>{lang.home.nos_partenaires}</b></h1>
                    <div className="row row-cols-4">
                        <div className="col order-first"><img src={asso1} alt="Association 1" /></div>
                        <div className="col"><img src={asso2} alt="Association 2" /></div>
                        <div className="col"><img src={asso3} alt="Association 3" /></div>
                        <div className="col order-last"><img src={asso4} alt="Association 4" /></div>
                    </div>
                </div>
                <div id="Nousreje" className="mt-lg-5 text-center mx-auto">
                    <h1 className="display-3"><b>{lang.home.on_recrute.titre}</b></h1>
                    <p>{lang.home.on_recrute.paragraphe1}</p>
                    <p>{lang.home.on_recrute.paragraphe2}</p>
                    <p>{lang.home.on_recrute.paragraphe3}</p>
                    <p>{lang.home.on_recrute.paragraphe4}</p>
                    <p>{lang.home.on_recrute.paragraphe5}</p>
                    <button className="button">
                        <p>{lang.home.on_recrute.bouton_rejoindre}</p>
                    </button>
                </div>
                <div className="container mt-5 mb-5">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.4252194424103!2d3.2663266768230304!3d49.85325663018251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e818f421f465bf%3A0x95ab756da5e0559a!2sAssociation%20MultiCit%C3%A9%20-%20Centre%20Social%20du%20Vermandois!5e0!3m2!1sfr!2sfr!4v1710741072140!5m2!1sfr!2sfr" width="100%" height="500" style={{ border: "0" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
                </div>
            </div>
        </>
    );
}

export default Home;
