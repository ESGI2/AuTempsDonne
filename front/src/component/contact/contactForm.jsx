import {useState} from "react";
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
        const {name, value, type, checked} = e.target;
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
        <section className="text-center" style={
            {}
        }>

            <div className="icons-container">
                <a style={{color: '#3b5998'}} href="#!" role="button">
                    <i className="fab fa-facebook-f fa-lg"></i>
                </a>

                <a style={{color: '#55acee'}} href="#!" role="button">
                    <i className="fab fa-twitter fa-lg"></i>
                </a>

                <a style={{color: '#dd4b39'}} href="#!" role="button">
                    <i className="fab fa-google fa-lg"></i>
                </a>

                <a style={{color: '#ac2bac'}} href="#!" role="button">
                    <i className="fab fa-instagram fa-lg"></i>
                </a>
            </div>


            <div className="p-5 bg-image" style={{
                height: '250px',
                borderRadius: '20px',


            }}>

            </div>


            <div id='reg' className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-250px',
                background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                backdropFilter: 'blur(30px)',
            }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-5">Pour toutes autre demande, contactez-nous via le formulaire
                                ci-dessous</h1>
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
            <br/><br/><br/>
            <div className="card-group">
                <div className="card">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" className="card-img-top"
                         alt="Hollywood Sign on The Hill"/>
                    <div className="card-body">
                        <h5 className="card-title">Moy Enzo</h5>
                        <p className="card-text">
                            Co-Founder of the association
                        </p>
                        <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>

                    </div>
                </div>
                <div className="card">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" className="card-img-top"
                         alt="Palm Springs Road"/>
                    <div className="card-body">
                        <h5 className="card-title">SURESHE Kévin</h5>
                        <p className="card-text">Founder of the association</p>
                        <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>

                    </div>
                </div>
                <div className="card">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" className="card-img-top"
                         alt="Los Angeles Skyscrapers"/>
                    <div className="card-body">
                        <h5 className="card-title">ARFAOUI Karim</h5>
                        <p className="card-text">
                            Co-Founder of the association
                        </p>
                        <p className="card-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                        </p>

                    </div>
                </div>
            </div>

        </section>

    );
}

export default Contact;
