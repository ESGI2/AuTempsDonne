import { useState } from "react";
import './logForm.css';
import {Link} from "react-router-dom";


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

    return (
        <section  className="text-center" style={
            {

            }
        }>
            <div className="p-5 bg-image" style={{
                backgroundColor: "#5B83A6",
                height: '300px',
                borderRadius: '20px',

            }}></div>

            <div id='log' className="card mx-4 mx-md-5 shadow-5-strong" style={{
                marginTop: '-250px',
                background: 'hsla(0, 0%, 100%, 0.8)',
                backdropFilter: 'blur(30px)',
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
                            <label htmlFor="" className="text-muted">First Time, Welcome : <Link to="/signin" className="link-primary">SignIn</Link>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LogForm;
