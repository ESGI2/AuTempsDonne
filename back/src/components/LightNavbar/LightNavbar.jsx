import './LightNavbar.css'
import logo from '../../assets/images/Icon ATD 50x50.svg'
import homeLogo from '../../assets/images/home.svg'
import membersLogo from '../../assets/images/member.svg'
import calendarLogo from '../../assets/images/calendar.svg'
import maraudeLogo from '../../assets/images/maraude walk.svg'
import truckLogo from '../../assets/images/truck.svg'
import warehouseLogo from '../../assets/images/warehouse.svg'
import logout from '../../assets/images/logout.svg'
import kiro from '../../assets/images/kirologo.jpg'
import ky from "ky";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const menuItems = [
    { id: 1, name: 'HOME', logo: homeLogo, redirect: '/admin'},
    { id: 2, name: 'MEMBERS', logo: membersLogo, redirect: '/users'},
    { id: 3, name: 'CALENDAR', logo: calendarLogo, redirect: '/calendar'},
    { id: 4, name: 'MARAUDE', logo: maraudeLogo, redirect: '/maraude'},
    { id: 5, name: 'TRUCK', logo: truckLogo, redirect: '/truck'},
    { id: 6, name: 'WAREHOUSE', logo: warehouseLogo, redirect: '/warehouse'},
    { id: 7, name: 'NEWSLETTER', logo: warehouseLogo, redirect: '/newsletter'},
];

function getUserData() {
    return ky.get("http://localhost:3000/user/me", {
        credentials: "include",
    }).then((response) => {
        if (response.status !== 200) {
            window.location.href = "/";
        } else {
            return response.json();
        }
    });
}

function logoutUser() {
    return ky.get("http://localhost:3000/user/logout", {
        credentials: "include",
    }).then((response) => {
        if (response.status === 200) {
            window.location.href = "/";
        }
    });

}



function LightNavbar() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData().then((data) => {
            setUserData(data.me);
        });
    }, []);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="head">
                    <img src={logo} alt="logo" className='logo'/>
                    <h1>Au Temps Donné</h1>
                </div>
                <hr/>
                <div className="menu">
                    <a className="brand">Menu</a>
                    <ul>
                        {menuItems.map((item) => (
                            <Link to={item.redirect} key={item.id}>
                                <li key={item.id}>
                                    <img src={item.logo} alt="logo" className='logo'/>
                                    <a>{item.name}</a>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <hr/>
                <div className="footer">
                    <div className="person">
                        <img src={kiro}></img>
                        <div className="userData">
                            <p>{userData.first_name}</p>
                            <p>{userData.last_name}</p>
                        </div>
                    </div>
                    <img src={logout} onClick={logoutUser}></img>
                </div>
            </div>
        </nav>
    );
}

export default LightNavbar;