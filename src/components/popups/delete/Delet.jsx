// import React, { useState } from 'react'
// import './delete.css'
// function Delet({ text, onClose }) {
//     const [model, setModel] = useState(true)
//     const toggleModel = () => {
//         setModel(!model)
//     }

//     return (
//         <div className='container'>
//             <div className='popup'>
//                 <p className='popup-text'>Are you sure you want to <span> </span>
//                     {
//                         text
//                     } ?
//                 </p>
//                 <div className='popup-buttons'>
//                     <button className='Accept'>
//                         Yes, <span>{text} </span>
//                         {
//                             // props.delete
//                         }
//                     </button>
//                     <button
//                         className='cancle'
//                         onClick={onClose}>
//                         Cancel
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Delet

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
