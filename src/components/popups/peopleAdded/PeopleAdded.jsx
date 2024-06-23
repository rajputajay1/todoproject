import React from 'react'
import './PeopleAdded.css'
import { useState } from 'react'
import AddPeople from '../addPeople/AddPeople'

function PeopleAdded({ onclose }) {

  const [gmailadd, setGmailAdd] = useState(false)

  const handleGmailAdd = () => {
    setGmailAdd(true)
  }
  const handleGmailclose = () => {
    setGmailAdd(false)
    onclose()
  }

  return (
    <>

      <div className="popup-overlaypeople">
        <div className="popup-contentpeople">
          <p className='addpeople'>Add people to the board </p>
          <input type="text" className='addpeopleinput'
            placeholder='Enter the email'
          />
          <div className='bothbtnaddpeople'>


            <div className='canclebtnpeopleadd' onClick={onclose}>
              Cancel
            </div>
            <div className='addemailbtnpeopleadd' onClick={handleGmailAdd}>
              Add Email
            </div>
          </div>
          {/* Add your form or content here */}
        </div>
      </div>
      {gmailadd && (
        <div>
          <AddPeople onclose={handleGmailclose} />
        </div>
      )}
    </>

  )
}

export default PeopleAdded