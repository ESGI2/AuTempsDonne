import React from 'react';
import './header.css';
import logo from '../../img/logo.png'; // Importez l'image

function Header() {
    return (

        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association"/>
            </div>
            <nav>
                <button className="association-btn">L'association</button>
                <button className="missions-btn">Nos missions</button>
                <button className="rejoindre-btn">Rejoindre l'asso</button>
            </nav>
        </header>

    );
}

export default Header;
