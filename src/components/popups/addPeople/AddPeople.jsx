import React, { useState } from 'react';
import "./AddPeople.css"

const AddPeople = ({ onclose }) => {
  const [email, setEmail] = useState('');



  return (
    <div className="container">
      <div className='addgmailbox'>

        <p className='gmiailtext'>Akashgupta@gmail.com added to board</p>
        <div className='gmailbtnadd' onClick={onclose}>
          Okay, got it!

        </div>
      </div>


    </div>
  );
};

export default AddPeople;