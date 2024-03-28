import { useState } from "react";
import './signForm.css'
import {Link, useLocation} from "react-router-dom";
import lang_en from "../../assets/lang/lang_en.json";
import lang_fr from "../../assets/lang/lang_fr.json";

function signForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
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

    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';

    return (
        <div className="container mt-5">
        <section  className="text-center" style={
            {
                paddingLeft:'20px',
                paddingRight:'20px',
                paddingBottom:'20px',
            }
        }>
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
                            <h1 className="fw-bold mb-5">Sign Up</h1>
                            <form onSubmit={handleSubmit}>
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
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Phone Number</label>
                                    <input type="tel" id="form3Example3" name="tel" className="form-control"
                                           onChange={handleChange}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" name="password" className="form-control"
                                           onChange={handleChange}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="inputState">Rôle</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>I want to be a Beneficiary</option>
                                        <option selected>I want to be a Volunteer</option>
                                        <option selected>Choose ...</option>
                                    </select>
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
                                    Sign up
                                </button>
                            </form>
                            <label htmlFor="" className="text-muted">You already have an account ?  <Link to={`/${langParam}/login`} className="link-primary">LogIn</Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </div>
    );
}

export default signForm;
