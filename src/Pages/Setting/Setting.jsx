import React from "react";
import "./Setting.css";
import { useState } from "react";

const Setting = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
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
    <>
      <div className="settingcontainer">
        <p className="setting">Setting</p>
        <div>
          <div className="input-container">
            <img src="./Profile.svg" alt="" className="icon-class" />
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-container">
            <img
              src="./mails.svg"
              alt=""
              className="icon-class "
              id="mailsimg"
            />
            <input type="text" placeholder="Update Email" />
          </div>
          <div className="input-container">
            <img src="./pass.svg" alt="" className="icon-class" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Old Password"
            />
            <img
              src="./seen.svg"
              alt=""
              className="icon-class-end"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="input-container">
            <img src="./pass.svg" alt="" className="icon-class" />
            <input
              type={oldPasswordVisible ? "text" : "password"}
              placeholder="New Password"
            />
            <img
              src="./seen.svg"
              alt=""
              className="icon-class-end"
              onClick={toggleConfirmPasswordVisibility}
            />

            <p className="password-strength">{passwordStrength}</p>
          </div>
          <div className="updatebtn">
            <p className="updatetext">Update</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
