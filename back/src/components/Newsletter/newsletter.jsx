import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { sendMail } from "./sendmail.js";

function NewsletterForm() {
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
            await sendMail(title, message);
            setTitle('');
            setMessage('');
            setError('');
        } catch (error) {
            setError('Une erreur s\'est produite lors de l\'envoi de la newsletter. Veuillez réessayer plus tard.');
        }
    };

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

                <div id='newsletter' className="mx-4 mx-md-5 shadow-5-strong" style={{
                    marginTop: '-250px',
                    background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '20px',
                    paddingBottom: '50px',
                }}>
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="fw-bold mb-5">Inscription à la newsletter</h1>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="formTitle">Titre</label>
                                        <input type="text" id="formTitle" name="title" className="form-control"
                                               value={title} onChange={handleTitleChange} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="formMessage">Message</label>
                                        <textarea id="formMessage" name="message" className="form-control"
                                                  rows="4" value={message} onChange={handleMessageChange}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Envoyer
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

export default NewsletterForm;
