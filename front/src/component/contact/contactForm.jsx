import { useState } from "react";
import './contactForm.css'
import {Link} from "react-router-dom";
import {beforeRead} from "@popperjs/core";

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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
        <section  className="text-center" style={
            {

            }
        }>
            <div className="p-5 bg-image" style={{
                height: '300px',
                borderRadius: '20px',

            }}></div>

            <div id='reg' className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-250px',
                background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                backdropFilter: 'blur(30px)',
            }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-5">Pour toutes autre demande, contactez-nous via le formulaire ci-dessous</h1>
                            <form onSubmit={handleSubmit}>

                                <div className="form-outline mb-4">
                                    <label htmlFor="inputState">Type of request</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>I want to be a Beneficiary but ....</option>
                                        <option selected>To do a Donation</option>
                                        <option selected>Need Help</option>
                                        <option selected>Nature Donation(Clothing, pants, ...)</option>
                                        <option selected>Partnership</option>
                                        <option selected>Choose ...</option>
                                    </select>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form3Example1">First name</label>
                                            <input type="text" id="form3Example1" name="firstName"
                                                   className="form-control" onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                                            <input type="text" id="form3Example2" name="lastName"
                                                   className="form-control" onChange={handleChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                    <input type="email" id="form3Example3" name="email" className="form-control"
                                           onChange={handleChange}/>
                                </div>

                                <div>
                                    <label htmlFor="form3Example4">Message</label>
                                    <textarea className="form-control" id="form3Example4" rows="4" name="message"
                                              onChange={handleChange}></textarea>
                                </div>

                                <div className="form-check d-flex justify-content-center mb-4">
                                    <input className="form-check-input me-2" type="checkbox" value=""
                                           id="form2Example33" name="subscribe" checked={formData.subscribe}
                                           onChange={handleChange}/>
                                    <label className="form-check-label" htmlFor="form2Example33">
                                        Subscribe to our newsletter
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Contact;
