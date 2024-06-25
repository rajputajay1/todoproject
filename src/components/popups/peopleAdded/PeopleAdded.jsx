// import React from 'react'
// import './PeopleAdded.css'
// import { useState } from 'react'
// import AddPeople from '../addPeople/AddPeople'

// function PeopleAdded({ onclose }) {

//   const [gmailadd, setGmailAdd] = useState(false)
//   const [gmail,setGmail]=useState("")

//   const handleGmailAdd = () => {
//     setGmailAdd(true)
//   }
//   const handleGmailclose = () => {
//     setGmailAdd(false)
//     onclose()
//   }

//   return (
//     <>

//       <div className="popup-overlaypeople">
//         <div className="popup-contentpeople">
//           <p className='addpeople'>Add people to the board </p>
//           <input type="text" className='addpeopleinput'
//             placeholder='Enter the email'
//             onChange={(e) => setGmail(e.target.value)}
//           />
//           <div className='bothbtnaddpeople'>


//             <div className='canclebtnpeopleadd' onClick={onclose}>
//               Cancel
//             </div>
//             <div className='addemailbtnpeopleadd' onClick={handleGmailAdd}>
//               Add Email
//             </div>
//           </div>
//           {/* Add your form or content here */}
//         </div>
//       </div>
//       {gmailadd && (
//         <div>
//           <AddPeople onclose={handleGmailclose} mail={gmail} />
//         </div>
//       )}
//     </>

//   )
// }

// export default PeopleAdded

import React, { useState } from 'react';
import './PeopleAdded.css';
import AddPeople from '../addPeople/AddPeople';

function PeopleAdded({ onclose }) {
  const [gmailadd, setGmailAdd] = useState(false);
  const [gmail, setGmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  const handleGmailAdd = () => {
    if (validateEmail(gmail)) {
      setGmailAdd(true);
      setEmailError("");
    } else {
      setEmailError("Email format is not correct");
    }
  };

  const handleGmailClose = () => {
    setGmailAdd(false);
    onclose();
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setGmail(email);
    if (email === "") {
      setEmailValid(false);
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailError("Invalid Email");
    } else {
      setEmailValid(true);
      setEmailError("");
    }
  };

  return (
    <>
      <div className="popup-overlaypeople">
        <div className="popup-contentpeople">
          <p className='addpeople'>Add people to the board</p>
          <input
            type="text"
            className='addpeopleinput'
            placeholder='Enter the email'
            onChange={handleEmailChange}
          />
          {emailError && <p className='email-error'>{emailError}</p>}
          <div className='bothbtnaddpeople'>
            <div className='canclebtnpeopleadd' onClick={onclose}>
              Cancel
            </div>
            <div
              className={`addemailbtnpeopleadd ${emailValid ? '' : 'disabled'}`}
              onClick={handleGmailAdd}
            >
              Add Email
            </div>
          </div>
        </div>
      </div>
      {gmailadd && (
        <div>
          <AddPeople onclose={handleGmailClose} mail={gmail} />
        </div>
      )}
    </>
  );
}

export default PeopleAdded;
