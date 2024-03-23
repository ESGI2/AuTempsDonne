import React from 'react';
import './header.css';
import logo from '../../assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom';

import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from '../../assets/lang/lang_en.json';

function Header() {
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
            </nav>
            <nav>
                {buttonLang()}
                <button className="rejoindre-btn">{lang.buttons.espace_client}</button>
                <Link to={`/${langParam}/don`}> <button className="don-btn">{lang.buttons.don}</button></Link>
            </nav>
        </header>
    );
}

export default Header;
