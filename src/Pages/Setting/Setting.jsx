// import React from "react";
// import "./Setting.css";
// import { useState } from "react";

// const Setting = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setOldPasswordVisible(!oldPasswordVisible);
//   };

//   const passwordStrength = (password) => {
//     if (password.length < 4) {
//       return "Weak";
//     } else if (password.length < 6) {
//       return "Medium";
//     } else {
//       return "Strong";
//     }
//   };
//   return (
//     <>
//       <div className="settingcontainer">
//         <p className="setting">Setting</p>
//         <div>
//           <div className="input-container">
//             <img src="./Profile.svg" alt="" className="icon-class" />
//             <input type="text" placeholder="Name" />
//           </div>
//           <div className="input-container">
//             <img
//               src="./mails.svg"
//               alt=""
//               className="icon-class "
//               id="mailsimg"
//             />
//             <input type="text" placeholder="Update Email" />
//           </div>
//           <div className="input-container">
//             <img src="./pass.svg" alt="" className="icon-class" />
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Old Password"
//             />
//             <img
//               src="./seen.svg"
//               alt=""
//               className="icon-class-end"
//               onClick={togglePasswordVisibility}
//             />
//           </div>
//           <div className="input-container">
//             <img src="./pass.svg" alt="" className="icon-class" />
//             <input
//               type={oldPasswordVisible ? "text" : "password"}
//               placeholder="New Password"
//             />
//             <img
//               src="./seen.svg"
//               alt=""
//               className="icon-class-end"
//               onClick={toggleConfirmPasswordVisibility}
//             />

//             <p className="password-strength">{passwordStrength}</p>
//           </div>
//           <div className="updatebtn">
//             <p className="updatetext">Update</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Setting;
// src/components/Setting/Setting.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Features/thunk";
import "./Setting.css";

const Setting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  // const { status, error, user } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const handleUpdate = () => {
    if ( !oldPassword || !newPassword) {
      alert("Please fill out all fields");
      return;
    }

    const userData = {
      name,
      email,
      oldPassword,
      newPassword,
    };

    dispatch(updateUserProfile(userData));
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
    <div className="settingcontainer">
      <p className="setting">Setting</p>
      <div>
        <div className="input-container">
          <img src="./Profile.svg" alt="" className="icon-class" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <img src="./mails.svg" alt="" className="icon-class" id="mailsimg" />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <img src="./pass.svg" alt="" className="icon-class" />
          <input
            type={oldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <img
            src="./seen.svg"
            alt=""
            className="icon-class-end"
            onClick={toggleOldPasswordVisibility}
          />
        </div>
        <div className="input-container">
          <img src="./pass.svg" alt="" className="icon-class" />
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <img
            src="./seen.svg"
            alt=""
            className="icon-class-end"
            onClick={togglePasswordVisibility}
          />
          <p className="password-strength">{passwordStrength(newPassword)}</p>
        </div>
        <div className="updatebtn" onClick={handleUpdate}>
          <p className="updatetext">Update</p>
        </div>
        {status === "loading" && <p>Updating...</p>}
        {status === "succeeded" && <p>Update successful!</p>}
        {status === "failed" && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default Setting;
