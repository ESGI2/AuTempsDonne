import { useState } from "react";
import './logForm.css';
import {Link, useLocation} from "react-router-dom";
import lang_en from "../../assets/lang/lang_en.json";
import lang_fr from "../../assets/lang/lang_fr.json";


function LogForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
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
        <div className="container mt-2">
        <section  className="text-center" style={
            {
                paddingLeft:'200px',
                paddingRight:'200px',
                paddingBottom:'100px',
            }
        }>
            <div className="p-5 bg-image" style={{
                height: '300px',
            }}></div>

            <div id='log' className="mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-250px',
                background: 'linear-gradient(rgba(91, 131, 166, 0.5), rgba(209, 209, 209, 0.5))',
                backdropFilter: 'blur(30px)',
                borderRadius: '20px',
                paddingBottom: '50px',
            }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold mb-5">Log in</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                    <input type="email" id="form3Example3" name="email" className="form-control"
                                           onChange={handleChange}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" name="password" className="form-control"
                                           onChange={handleChange}/>
                                </div>


                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Log in
                                </button>
                            </form>
                            <label htmlFor="" className="text-muted">First Time, Welcome : <Link to={`/${langParam}/signin`} className="link-primary">SignIn</Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default LogForm;
