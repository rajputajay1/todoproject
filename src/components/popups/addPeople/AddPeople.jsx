import React, { useState } from 'react';
import "./AddPeople.css"

const AddPeople = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddEmail = () => {
    // Logic to add email to the board
    console.log('Adding email:', email);
    setEmail(''); // Clear the input after adding
  };

  const handleCancel = () => {
    // Logic for cancel action
    setEmail(''); // Clear the input
  };

  return (
    <div className="container">
    <div className="Add-people">
    <div className="input-container">
      <p className='add-text'>Add people to the board</p>
      <input
      className='input'
        type="email"
        placeholder="Enter the email"
        value={email}
        onChange={handleEmailChange}
      /></div>
      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="add-email" onClick={handleAddEmail}>
          Add Email
        </button>
      </div>
    </div></div>
  );
};

export default AddPeople;