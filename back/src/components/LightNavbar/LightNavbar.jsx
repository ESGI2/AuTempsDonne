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
import {useEffect, useState} from "react";
import ky from "ky";

const menuItems = [
    { id: 1, name: 'HOME', logo: homeLogo},
    { id: 2, name: 'MEMBERS', logo: membersLogo},
    { id: 3, name: 'CALENDAR', logo: calendarLogo},
    { id: 4, name: 'MARAUDE', logo: maraudeLogo},
    { id: 5, name: 'TRUCK', logo: truckLogo},
    { id: 6, name: 'WAREHOUSE', logo: warehouseLogo},
];

const [userData, setUserData] = useState();

// eslint-disable-next-line react-hooks/rules-of-hooks
// useEffect(() => {
//     const fetchUserData = async () => {
//         try {
//             const response = await ky.get('http://localhost:3000/user/me', {
//                 credentials: 'include'
//             }).json();
//             setUserData(response);
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             setUserData(null);
//         }
//     };
//
//     fetchUserData();
// } , []);



function LightNavbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="head">
                    <img src={logo} alt="logo" className='logo'/>
                    <h1>Au Temps Donné</h1>
                </div>
                <hr/>
                <div className="menu">
                    <a href="/public" className="brand">Menu</a>
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <img src={item.logo} alt="logo" className='logo'/>
                                <a href="/public">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr/>
                <div className="footer">
                    <div className="person">
                        <img src={kiro}></img>
                        <div className="userData">
                            <p>{userData.first_name}</p>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <img src={logout}></img>
                </div>
            </div>
        </nav>
    );
}

export default LightNavbar;