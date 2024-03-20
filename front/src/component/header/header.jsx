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

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association" />
                <span>AU TEMPS DONNE</span>
            </div>
            <nav>
                <Link to={`/${langParam}`}><button className="association-btn">{lang.menu.association}</button></Link>
                <Link to={`/${langParam}/mission`}><button className="missions-btn">{lang.menu.missions}</button></Link>
                <Link to={`/${langParam}/contact`}><button className="contacter-btn">{lang.menu.contacter}</button></Link>
            </nav>
            <nav>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {lang.dropdown.langue}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={`/${langParam}`}><button className="dropdown-item">{lang.dropdown.francais}</button></Link>
                        <Link to={`/${langParam}`}><button className="dropdown-item">{lang.dropdown.anglais}</button></Link>
                    </div>
                </div>
                <button className="rejoindre-btn">{lang.buttons.espace_client}</button>
                <button className="don-btn">{lang.buttons.don}</button>
            </nav>
        </header>
    );
}

export default Header;
