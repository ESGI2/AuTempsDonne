import React from 'react';
import './header.css';
import logo from '../../assets/img/logo.png';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association" />
                <span>AU TEMPS DONNE</span>
            </div>
            <nav>
                <button className="association-btn" ><Link to="/">ASSOCIATION</Link></button>
                <button className="missions-btn"><Link to="/mission">NOS MISSIONS</Link></button>
                <button className="contacter-btn">NOUS CONTACTER</button>
            </nav>
            <nav>
                <button className="rejoindre-btn">ESPACE CLIENT</button>
                <button className="don-btn">DON</button>
            </nav>
        </header>
    );
}

export default Header;
