import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom';

import ky from "ky";

import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from '../../assets/lang/lang_en.json';

function HeaderVolunteer() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';

    function buttonLang() {
        const currentPath = pathname.replace(/^\/(fr|en)\//, '');
        const frPath = `/fr/${currentPath}`;
        const enPath = `/en/${currentPath}`;

        return (
            <div className="dropdown">
                <button className="btn btn-secondary">{lang.dropdown.langue}</button>
                <div className="dropdown-content">
                    <Link to={frPath}><a > {lang.dropdown.francais}</a></Link>
                    <Link to={enPath}><a > {lang.dropdown.anglais}</a></Link>
                </div>
            </div>
        );

        }
    function SignOut(){
        return ky.get("http://localhost:3000/user", {
            credentials: "include",
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "/fr/home";
            }
        })
    }

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association" />
                <span>AU TEMPS DONNE</span>
            </div>
            <nav>
                <Link to={`/${langParam}/home`}><button className="association-btn">{lang.menu.association}</button></Link>
                <Link to={`/${langParam}/mission`}><button className="missions-btn">{lang.menu.missions}</button></Link>
                <Link to={`/${langParam}/contact`}><button className="contacter-btn">{lang.menu.contacter}</button></Link>
                <button className="association-btn">{lang.menu.demande}</button>

            </nav>

            <nav>
                {buttonLang()}
                <button className="rejoindre-btn" onClick={SignOut} >{lang.buttons.deconnexion}</button>
                <button className="don-btn">{lang.buttons.profil}</button>
            </nav>
        </header>
    );
}

export default HeaderVolunteer;
