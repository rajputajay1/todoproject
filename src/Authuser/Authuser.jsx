import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import "../Pages/Register/Register.css"
import { useNavigate } from 'react-router-dom';
import { SignInuser, SignUpuser } from '../Utils/ApiCalls';


const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isRegister) {
            dispatch(SignUpuser(formData)).then((response) => {
                console.log(response + "bika");
                if (response.payload && response.payload.success) {
                    navigate('/home');
                    console.log("api success");
                } else {
                    console.log("api error");

                }
            });
        } else {
            dispatch(SignInuser({ email: formData.email, password: formData.password })).then((response) => {
                if (response.payload && response.payload.success) {
                    navigate('/home');
                    console.log("login success");
                } else {
                    // Handle error
                    console.log("Login failed");
                }
            });
        }
    };

    const toggleAuthMode = () => {
        setIsRegister(!isRegister);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="astronaut-image">
                    <div className='formbox'>
                        <img src="Art.svg" alt="Astronaut" className='formimg' />
                    </div>
                    <span className="welcome-text">Welcome aboard my friend</span>
                    <span className="subtext">Just a couple of clicks and we start</span>
                </div>
                {isRegister ? (
                    <Register
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        toggleAuthMode={toggleAuthMode}
                    />
                ) : (
                    <Login
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        toggleAuthMode={toggleAuthMode}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
