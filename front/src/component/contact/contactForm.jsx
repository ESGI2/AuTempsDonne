import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import lang_fr from '../../assets/lang/lang_fr.json';
import lang_en from "../../assets/lang/lang_en.json";
import './contactForm.css';

function ContactForm() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        subscribe: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <h1 className="text-center" style={{ paddingTop: '50px' }}>{lang.contactForm.titre}</h1>

            <section className="text-center">
                <div className="icons-container" style={{ paddingBottom: '50px' }}>
                    <a style={{ color: '#3b5998' }} href="#!" role="button">
                        <i className="fab fa-facebook-f fa-lg"></i>
                    </a>

                    <a style={{ color: '#55acee' }} href="#!" role="button">
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>

                    <a style={{ color: '#dd4b39' }} href="#!" role="button">
                        <i className="fab fa-google fa-lg"></i>
                    </a>

                    <a style={{ color: '#ac2bac' }} href="#!" role="button">
                        <i className="fab fa-instagram fa-lg"></i>
                    </a>
                </div>

                <div className="p-5 bg-image" style={{ height: '250px' }}></div>

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
                                <h1 className="fw-bold mb-5">{lang.contactForm.subtitre}</h1>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="inputState">{lang.contactForm.type_request}</label>
                                        <select id="inputState" className="form-control">
                                            {lang.contactForm.request_options.map((option, index) => (
                                                <option key={index}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example1">{lang.contactForm.first_name}</label>
                                                <input type="text" id="form3Example1" name="firstName" className="form-control" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example2">{lang.contactForm.last_name}</label>
                                                <input type="text" id="form3Example2" name="lastName" className="form-control" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">{lang.contactForm.email}</label>
                                        <input type="email" id="form3Example3" name="email" className="form-control" onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="form3Example4">{lang.contactForm.message}</label>
                                        <textarea className="form-control" id="form3Example4" rows="4" name="message" onChange={handleChange}></textarea>
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" name="subscribe" checked={formData.subscribe} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="form2Example33">
                                            {lang.contactForm.subscribe_newsletter}
                                        </label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        {lang.contactForm.submit_button}
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

export default ContactForm;
