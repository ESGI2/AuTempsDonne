import React, {useState} from "react";
import './signForm.css'
import { useLocation, Link } from "react-router-dom";
import ky from "ky";
import {Alert} from "react-bootstrap";
import lang_en from "../../assets/lang/lang_en.json";
import lang_fr from "../../assets/lang/lang_fr.json";
import './signForm.css';

function SignForm() {

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [subscribe, setSubscribe] = useState(true);
    const [error, setError] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');


    const handleFirstNameChange = (e) => {
        setFirst_name(e.target.value);
    }
    const handleLastNameChange = (e) => {
        setLast_name(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }
    const handleSubscribeChange = (e) => {
        setSubscribe(e.target.checked);
    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!first_name || !last_name || !email || !password || !role) {
            setError('Please fill in all fields');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const apiUrl = role === 'beneficiary' ? '/beneficiary' : '/volunteer';
            const response = await ky.post(`http://localhost:3000/register${apiUrl}`, {
                json: {first_name: first_name, last_name: last_name, email, password, subscribe},
                credentials: 'include',
            });

            if (response.ok) {
                setSucessMessage('User successfully registered');
            } else {
                setError('An error occurred. Please try again later.');
            }
        } catch (error) {
            setError('An error occurred. Please make sure all fields are filled correctly.');
        }
    }

    const { pathname } = useLocation();
    const lang = pathname.startsWith('/en') ? lang_en : lang_fr;
    const langParam = pathname.startsWith('/en') ? 'en' : 'fr';

    return (
        <div className="container mt-5">
            <section className="text-center" style={
                {
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingBottom: '20px',
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
                                <h1 className="fw-bold mb-5">{lang.signForm.sign_up}</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example1">{lang.signForm.first_name}</label>
                                                <input type="text" id="form3Example1" name="firstName"
                                                       className="form-control" onChange={handleFirstNameChange}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="form3Example2">{lang.signForm.last_name}</label>
                                                <input type="text" id="form3Example2" name="lastName"
                                                       className="form-control" onChange={handleLastNameChange}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example3">{lang.signForm.email}</label>
                                        <input type="email" id="form3Example3" name="email" className="form-control"
                                               onChange={handleEmailChange}/>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4">{lang.signForm.password}</label>
                                        <input type="password" id="form3Example4" name="password"
                                               className="form-control"
                                               onChange={handlePasswordChange}/>
                                    </div>

                                    <select id="inputState" name="role" className="form-control"
                                            onChange={handleRoleChange}
                                            value={role}>
                                        <option value="" disabled>{lang.signForm.choose}</option>
                                        <option value="beneficiary">{lang.signForm.beneficiary}</option>
                                        <option value="volunteer">{lang.signForm.volunteer}</option>
                                    </select>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value=""
                                               id="form2Example33" name="subscribe" checked={subscribe}
                                               onChange={handleSubscribeChange}/>
                                        <label className="form-check-label" htmlFor="form2Example33">
                                            {lang.signForm.subscribe_newsletter}

                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        {lang.signForm.sign_up}
                                    </button>
                                </form>
                                <label htmlFor="" className="text-muted">{lang.signForm.already_account} ? <Link to={`/${langParam}/login`} className="link-primary">{lang.signForm.log_in}</Link>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignForm;
