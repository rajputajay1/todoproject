import React, { useState } from "react";
import "./Register.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInuser, SignUpuser } from "../../Utils/ApiCalls";
import { ToastContainer, toast } from "react-toastify";
import { postData } from "../../api";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  const validate = () => {
    let tempErrors = {};
    if (isRegister) {
      if (!formData.name) tempErrors.name = "Name is required";
      if (!formData.email) tempErrors.email = "Email is required";
      if (!formData.password) tempErrors.password = "Password is required";
      if (!formData.confirmPassword)
        tempErrors.confirmPassword = "Confirm Password is required";
      if (formData.password !== formData.confirmPassword)
        tempErrors.confirmPassword = "Passwords do not match";
    } else {
      if (!formData.email) tempErrors.email = "Email is required";
      if (!formData.password) tempErrors.password = "Password is required";
    }
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    console.log(formData);
    setLoading(true);
    try {
      const response = await postData(
        `/user/${isRegister ? "register" : "login"}`,
        formData
      ); // Update the endpoint as necessary

      const token = response.token; // Adjust based on the actual response structure
      toast.success(`${isRegister}?'Register':'Login' successful!`);
      localStorage.setItem("token", token); // Save the token in localStorage
      navigate("/home"); // Redirect to home page
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error(
        `${isRegister ? "Register" : "Login"} failed: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const passwordStrength = (password) => {
    if (password.length < 4) {
      return "Weak";
    } else if (password.length < 6) {
      return "Medium";
    } else {
      return "Strong";
    }
  };
  return (
    <div className="auth-container">
      <ToastContainer />
      <div className="auth-content">
        <div className="astronaut-image">
          <div className="formbox">
            <img src="Art.svg" alt="Astronaut" className="formimg" />
          </div>
          <span className="welcome-text">Welcome aboard my friend</span>
          <span className="subtext">Just a couple of clicks and we start</span>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="head">{isRegister ? "Register" : "Login"}</p>
          {isRegister && (
            <div className="form-group">
              <div className="inner-form-input">
                <img src="pro.svg" alt="" className="frommail" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="forminput"
                />
              </div>
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
          )}
          <div className="form-group">
            <div className="inner-form-input">
              <img src="mails.svg" alt="" className="frommail " id="mailid" />
              <input
                type="email"
                name="email"
                className="forminput"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <div className="inner-form-input">
              <img src="pass.svg" alt="" className="frommail" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="forminput"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src="seen.svg"
                alt=""
                className="passseenendform"
                onClick={togglePasswordVisibility}
              />
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
            {isRegister && (
              <div className="password-strength">
                {formData.password && (
                  <span
                    className={`strength-${passwordStrength(
                      formData.password
                    ).toLowerCase()}`}
                  >
                    {passwordStrength(formData.password)}
                  </span>
                )}
              </div>
            )}
          </div>
          {isRegister && (
            <div className="form-group">
              <div className="inner-form-input">
                <img src="pass.svg" alt="" className="frommail" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="forminput"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <img
                  src="seen.svg"
                  alt=""
                  className="passseenendform"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {isRegister ? "Register" : "Log in"}
          </button>
          <div className="auth-toggle" disabled={loading}>
            {isRegister ? "Have an account?" : "Need an account?"}
            <span className="inActive" onClick={toggleAuthMode}>
              {isRegister ? "Log in" : "Register"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
