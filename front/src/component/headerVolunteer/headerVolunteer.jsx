import React from 'react';
import logo from '../../assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom';
import ky from 'ky';

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
                    <Link to={frPath}>{lang.dropdown.francais}</Link>
                    <Link to={enPath}>{lang.dropdown.anglais}</Link>
                </div>
            </div>
        );
    }
    function logout() {
        return ky.get("http://localhost:3000/user/logout", {
            credentials: "include",
        }).then((response) => {
            if (response.status === 200) {
                window.location.href = `/${langParam}/home`;
            } else {
                console.error("Erreur de déconnexion");
            }
        }).catch((error) => {
            console.error("Problème de déconnexion:", error.message);
        });
    }

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association" />
                <span>AU TEMPS DONNE</span>
            </div>
            <nav>
                <Link to={`/${langParam}/home`}>{lang.menu.association}</Link>
                <Link to={`/${langParam}/mission`}>{lang.menu.missions}</Link>
                <Link to={`/${langParam}/contact`}>{lang.menu.contacter}</Link>
                <button className="association-btn">{lang.menu.agenda}</button>
            </nav>

            <nav>
                {buttonLang()}
                <button className="rejoindre-btn" onClick={logout}>{lang.buttons.deconnexion}</button>
                <Link to={`/${langParam}/profil`}><button className="don-btn">{lang.buttons.profil}</button></Link>
            </nav>
        </header>
    );
}

export default HeaderVolunteer;
