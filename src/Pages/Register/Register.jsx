import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignInuser, SignUpuser } from '../../Utils/ApiCalls';


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
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className='head'>{isRegister ? 'Register' : 'Login'}</h2>
          {isRegister && (
            <div className="form-group">
              <img src="pro.svg" alt="" className='frommail' />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className='forminput'
              />
            </div>
          )}
          <div className="form-group">
            <img src="mails.svg" alt="" className='frommail ' id='mailid' />
            <input
              type="email"
              name="email"
              className='forminput'
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <img src="pass.svg" alt="" className='frommail' />
            <input
              type="password"
              name="password"
              className='forminput'
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <img src="seen.svg" alt="" className='passseenendform' />
          </div>
          {isRegister && (
            <div className="form-group">
              <img src="pass.svg" alt="" className='frommail' />

              <input
                type="password"
                className='forminput'
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <img src="seen.svg" alt="" className='passseenendform' />

            </div>
          )}
          <button type="submit" className="auth-button">
            {isRegister ? 'Register' : 'Log in'}
          </button>
          <div className="auth-toggle">
            {isRegister ? 'Have an account?' : 'Need an account?'}
            <span className='inActive' onClick={toggleAuthMode}>
              {isRegister ? 'Log in' : 'Register'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
