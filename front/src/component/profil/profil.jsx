import React, { useState, useEffect } from 'react';
import ky from 'ky';

const Profiler = () => {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [error, setError] = useState('');
    const [dob, setDob] = useState('');
    const [city, setCity] = useState('');
    const [nationality, setNationality] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [familySituation, setFamilySituation] = useState('');
    const [road, setRoad] = useState('');
    const [childrens, setChildrens] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [changePasswordError, setChangePasswordError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const meResponse = await getMe();
                const userData = meResponse.me;
                setId(userData.id);
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setEmail(userData.email);
                setSubscribe(userData.newsletter);
                setDob(userData.date_of_birth);
                setCity(userData.city);
                setNationality(userData.nationality);
                setPostalCode(userData.postal_code);
                setFamilySituation(userData.family_situation);
                setRoad(userData.road);
                setChildrens(userData.nbr_child);
                setPhoneNumber(userData.phone);
                setCountry(userData.country);
            } catch (error) {
                setError('Erreur lors de la récupération des données de l\'utilisateur');
            }
        };

        fetchUserData();
    }, []);

    const getMe = async () => {
        try {
            const response = await ky.get("http://autempsdonne.site:3000/user/me", {
                credentials: "include",
            });
            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                return response.json();
            }
        } catch (error) {
            throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
    };

    const EditUserInfo = async (e) => {
        e.preventDefault();
        try {
            const userInfo = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                nbr_child: childrens,
                newsletter: subscribe ? 1 : 0,
                phone: phoneNumber,
                country: country,
                city: city,
                postal_code: postalCode,
                road: road,
                date_of_birth: dob,
                nationality: nationality,
                family_situation: familySituation
            };

            const response = await ky.put(`http://autempsdonne.site:3000/user/${id}`, {
                json: userInfo,
                credentials: "include",
            });

            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                return response.json();
            }
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour des données de l\'utilisateur');
        }
    };

    const handleChangePassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                setChangePasswordError('Les mots de passe ne correspondent pas');
                return;
            }

            const response = await ky.put(`http://autempsdonne.site:3000/user/password/${id}`, {
                json: { password: newPassword },
                credentials: "include",
            });

            if (response.status !== 200) {
                window.location.href = "/";
            } else {
                setShowChangePasswordModal(false);
            }
        } catch (error) {
            throw new Error('Erreur lors de la modification du mot de passe');
        }
    };

    return (
        <div className="container mt-5">
            <section className="text-center">
                <div className="p-5 bg-image" style={{ height: '250px' }}></div>
                <div className="mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: '-250px', background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))', backdropFilter: 'blur(30px)', borderRadius: '20px', paddingBottom: '50px' }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="fw-bold mb-5">Profil</h1>
                                <form onSubmit={EditUserInfo}>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formLastName">Nom</label>
                                            <input type="text" id="formLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formFirstName">Prénom</label>
                                            <input type="text" id="formFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formEmail">Email</label>
                                            <input type="email" id="formEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formDob">Date de Naissance</label>
                                            <input type="date" id="formDob" value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formCity">Ville</label>
                                            <input type="text" id="formCity" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formNationality">Nationalité</label>
                                            <input type="text" id="formNationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formPostalCode">Code Postal</label>
                                            <input type="text" id="formPostalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formFamilySituation">Situation Familiale</label>
                                            <select id="formFamilySituation" value={familySituation} onChange={(e) => setFamilySituation(e.target.value)} className="form-select">
                                                <option value="">Sélectionner</option>
                                                <option value="single">Célibataire</option>
                                                <option value="married">Marié(e)</option>
                                                <option value="divorced">Divorcé(e)</option>
                                                <option value="widowed">Veuf/Veuve</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formRoad">Rue</label>
                                            <input type="text" id="formRoad" value={road} onChange={(e) => setRoad(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formChildrens">Enfants</label>
                                            <input type="number" id="formChildrens" value={childrens} onChange={(e) => setChildrens(parseInt(e.target.value))} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formPhoneNumber">Numéro de Téléphone</label>
                                            <input type="tel" id="formPhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label" htmlFor="formCountry">Pays</label>
                                            <input type="text" id="formCountry" value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="formSubscribe" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
                                                <label className="form-check-label" htmlFor="formSubscribe">S'abonner à la newsletter</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Enregistrer</button>
                                </form>
                                <button className="btn btn-secondary btn-block" onClick={() => setShowChangePasswordModal(true)}>Modifier le mot de passe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showChangePasswordModal &&
                <div className={`modal fade ${showChangePasswordModal ? 'show' : ''}`} id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden={!showChangePasswordModal} style={{ display: showChangePasswordModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changePasswordModalLabel">Modifier le mot de passe</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowChangePasswordModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmNewPassword" className="form-label">Confirmer le nouveau mot de passe</label>
                                    <input type="password" className="form-control" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                </div>
                                {changePasswordError && <div className="alert alert-danger">{changePasswordError}</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Modifier le mot de passe</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Profiler;
