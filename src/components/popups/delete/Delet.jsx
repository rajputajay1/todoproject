import React from 'react';
import './delete.css';

function Delet({ text, onClose, onConfirm }) {
    return (
        <div className='container'>
            <div className='popup'>
                <p className='popup-text'>Are you sure you want to <span>{text}</span>?</p>
                <div className='popup-buttons'>
                    <button className='Accept' onClick={onConfirm}>
                        Yes, <span>{text}</span>
                    </button>
                    <button className='cancle' onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Delet;
