import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import ky from 'ky';
import logo from '../../assets/img/logo.png';
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from '../../assets/lang/lang_en.json';

function LogHeader() {
    const {pathname} = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await ky.get('http://localhost:3000/user/me', {
                    credentials: 'include',
                }).json();
                const {role} = response.me;
                setUserRole(role);
            } catch (error) {
                console.error(error);
                setUserRole(null);
            }
        };

        fetchUserRole();
    }, []);


    function Signout() {
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

    function roleBasedButton(userRole, langParam, lang) {
        const roleButtons = {
            volunteer: <Link to={`/${langParam}/agenda`}>
                <button className="association-btn">{lang.menu.agenda}</button>
            </Link>,
            beneficiary: <Link to={`/${langParam}/demande`}>
                <button className="association-btn">{lang.menu.demande}</button>
            </Link>,
        };

        return roleButtons[userRole] || null;
    }

    function buttonLang() {
        const currentPath = pathname.replace(/^\/(fr|en)\//, '');
        const frPath = `/fr/${currentPath}`;
        const enPath = `/en/${currentPath}`;

        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button">{lang.dropdown.langue}</button>
                <div className="dropdown-content">
                    <Link to={frPath}>{lang.dropdown.francais}</Link>
                    <Link to={enPath}>{lang.dropdown.anglais}</Link>
                </div>
            </div>
        );
    }

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo de l'association"/>
                <span>AU TEMPS DONNE</span>
            </div>
            <nav>
                <Link to={`/${langParam}/main`}>
                    <button className="association-btn">{lang.menu.association}</button>
                </Link>
                <Link to={`/${langParam}/missionlog`}>
                    <button className="missions-btn">{lang.menu.missions}</button>
                </Link>

                <Link to={`/${langParam}/`}>
                    <button className="contacter-btn">{lang.menu.contacter}</button>
                </Link>

                {roleBasedButton(userRole, langParam, lang)}
            </nav>
            <nav>
                {buttonLang()}
                <Link to={`/${langParam}/profil`}>
                    <button className="don-btn">{lang.buttons.profil}</button>
                </Link>
                <button className="rejoindre-btn" onClick={Signout}>{lang.buttons.deconnexion}</button>


            </nav>
        </header>
    );
}

export default LogHeader;
