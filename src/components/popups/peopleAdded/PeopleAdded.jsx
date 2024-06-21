import React from 'react'
import './PeopleAdded.css'

function PeopleAdded(props) {
  return (
    <div className='container'>
    <div className='content'>
        <p className='text'>
            {props.email}
            added to board
        </p>
        <button className='okay'>
          Okay,got it!
        </button>
    </div></div>
  )
}

export default PeopleAdded