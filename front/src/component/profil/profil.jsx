import React, { useState, useEffect } from 'react';
import ky from "ky";

const Profiler = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ky.get('http://localhost:3000/user/me', {
                    credentials: 'include',
                }).json();
                const {first_name, last_name, email, subscribe} = response.me;
                setFirstName(first_name);
                setLastName(last_name);
                setEmail(email);
                setSubscribe(subscribe);
            } catch (error) {
                setError('Erreur lors de la récupération des données de l\'utilisateur');
            }
        };

        fetchUserData();
    }, []);

    // Modification des données de l'utilisateur (non fonctionnel)

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await ky.put('http://localhost:3000/user/me', {
    //             json: {
    //                 first_name: firstName,
    //                 last_name: lastName,
    //                 email: email,
    //                 password: password,
    //                 subscribe: subscribe
    //             }
    //         });
    //         setError('');
    //     } catch (error) {
    //         setError('Erreur lors de la mise à jour des données de l\'utilisateur');
    //     }
    // };

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
                                <h1 className="fw-bold mb-5">Profil</h1>
                                <form>
                                    <div className="row">
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example1">Nom</label>
                                                <input type="text" id="form3Example1" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example2">Prénom</label>
                                                <input type="text" id="form3Example2" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">Email</label>
                                        <input type="email" id="form3Example3" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>

                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" value={subscribe} onChange={(e) => setSubscribe(e.target.checked)} id="subscribeCheck" />
                                        <label className="form-check-label" htmlFor="subscribeCheck">
                                            {subscribe ? "Vous êtes inscrit" : "Vous n'êtes pas inscrit"}
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profiler;
