import React, { useEffect, useState } from 'react';
import ky from 'ky';
import { Link, useLocation } from "react-router-dom";
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from "../../assets/lang/lang_en.json";

function Main() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ky.get('http://localhost:3000/user/me', {
                    credentials: 'include',
                }).json();
                console.log(response);
                const { first_name, last_name } = response.me;
                setFirstName(first_name);
                setLastName(last_name);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'utilisateur');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mt-5">
            <section className="text-center" style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingBottom: '20px',
            }}>
                <div className="p-5 bg-image" style={{
                    height: '250px',
                }}></div>

                <div id='reg' className="mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: '-250px',
                    background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '20px',
                    paddingBottom: '50px',
                }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="fw-bold mb-5">{lang.main.title}</h1>
                                <form>
                                    <h1>{`${firstName} ${lastName}`}</h1>
                                </form>
                                <p className="text-center">{lang.main.subtitle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;
