import React from 'react';
import m1 from '../../assets/img/m1.png';
import m2 from '../../assets/img/m2.png';
import m3 from '../../assets/img/m3.png';
import m4 from '../../assets/img/m4.png';
import m5 from '../../assets/img/m5.png';

import './mission.css';

function Mission() {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} className="mt-lg-5">
                <div className="card" >
                    <img src={m1} alt="Mission 1"/>
                </div>

                <div className="card" >
                    <img src={m2} alt="Mission 2"/>
                </div>

                <div className="card" >
                    <img src={m3} alt="Mission 3"/>
                </div>

                <div className="card" >
                    <img src={m4} alt="Mission 4"/>
                </div>

                <div className="card" >
                    <img src={m5} alt="Mission 5"/>
                </div>
            </div>

            <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' , backgroundColor: '#fff3cd' , marginLeft : "10%" , marginRight : "10%" }}>
                <div style={{ textAlign: 'center' , padding: "0 20px"}}>
                    <h1>281</h1>
                    <h3>Bénévoles</h3>
                </div>

                <div style={{ textAlign: 'center' , padding: "0 20px" }}>
                    <h1>1009</h1>
                    <h3>Bénéficiaires</h3>
                </div>

                <div style={{ textAlign: 'center' , padding: "0 20px" }}>
                    <h1>15846</h1>
                    <h3>Repas distribués</h3>
                </div>
            </div>

            <div  style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' , backgroundColor: '#fff3cd' , marginLeft : "10%" , marginRight : "10%" }}>
                <div style={{ textAlign: 'center' , padding: "0 20px"}}>
                    <h1>87</h1>
                    <h3>Don matériel</h3>
                </div>

                <div style={{ textAlign: 'center' , padding: "0 20px" }}>
                    <h1>70 000$</h1>
                    <h3>Don argent</h3>
                </div>

                <div style={{ textAlign: 'center' , padding: "0 20px" }}>
                    <h1>15846</h1>
                    <h3>Repas distribués</h3>
                </div>
            </div>

        </>
    );
}

export default Mission;
