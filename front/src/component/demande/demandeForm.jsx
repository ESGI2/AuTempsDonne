import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import ky from "ky";
import getAuthCookie from "../../utils/getAuth.js";
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from '../../assets/lang/lang_en.json';

function DemandeForm() {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || message.trim() === '') {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const cookie = getAuthCookie();
            const response = await ky.post('http://autempsdonne.site:3000/ticket', {
                json: {
                    title,
                    message
                },
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${cookie}`
                }
            });

            if (response.status === 201) {
                console.log('Ticket soumis avec succès !');
            } else {
                setError('Erreur lors de la soumission du ticket.');
            }
        } catch (error) {
            setError('Erreur lors de la soumission du ticket.');
        }
    };

    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';


    return (
        <div className="container mt-2">
            <section className="text-center" style={{
                paddingLeft: '100px',
                paddingRight: '100px',
                paddingBottom: '100px',
            }}>
                <div className="p-5 bg-image" style={{
                    height: '300px',
                }}></div>

                <div id='demande' className="mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: '-250px',
                    background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '20px',
                    paddingBottom: '50px',
                }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="fw-bold mb-5">{lang.demandeForm.ticket_demand}</h1>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="formTitle">{lang.demandeForm.title}</label>
                                        <input type="text" id="formTitle" name="title" className="form-control"
                                               onChange={handleTitleChange} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="formMessage">{lang.demandeForm.message}</label>
                                        <textarea id="formMessage" name="message" className="form-control"
                                                  rows="4" onChange={handleMessageChange}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        {lang.demandeForm.submit}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DemandeForm;