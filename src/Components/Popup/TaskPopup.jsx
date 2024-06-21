// // import React from 'react';
// // import './TaskPopup.css';

// // const TaskPopup = ({ closePopup }) => {
// //     return (
// //         <div className="popup-overlay">
// //             <div className="popup-content">
// //                 <p className='tittle'>Title  <span className='star'>*</span></p>

// //                 <div>


// //                     <input type="text" className='todotaskinput'
// //                         placeholder='Enter Task Title'
// //                     />
// //                 </div>
// //                 <div className='taskbtns'>

// //                     <p className='tittle'>Select Priority   <span className='star'>*</span></p>
// //                     <div className='taskhighpriority'>
// //                         <div className='taskcirclehigh'></div>
// //                         <p className='tittle'>HIGH PRIORITY</p>
// //                     </div>
// //                     <div className='taskhighpriority'>
// //                         <div className='taskcirclemid'></div>
// //                         <p className='tittle'>MODERATE PRIORITY</p>
// //                     </div>
// //                     <div className='taskhighpriority'>
// //                         <div className='taskcirclelow'></div>
// //                         <p className='tittle'>LOW PRIORITY</p>
// //                     </div>
// //                 </div>

// //                 <div className='assinetask'>
// //                     <p className='tittle'>Assign to</p>
// //                     <input type="text" className='todotaskinput'
// //                         placeholder='Add a assignee'
// //                     />
// //                 </div>
// //                 <p className='tittle'>Checklist (1/3) <span className='star'>*</span> </p>
// //                 <div className='addtaskall'>
// //                     <input type="checkbox" className='taskcheckbox' />
// //                     <input type="text" placeholder='Add a task' className='todotaskinputadd' />
// //                     <img src="./Delete.svg" alt="Delete" className='taskcheckboxend' />
// //                 </div>
// //                 <div className='addtaskall'>
// //                     <input type="checkbox" className='taskcheckbox' />
// //                     <input type="text"
// //                         placeholder='Add a task'
// //                         className='todotaskinputadd'
// //                     />
// //                     <img src="./Delete.svg" alt="" className='taskcheckboxend' />

// //                 </div>


// //                 <div className='addbtntask'>
// //                     <img src="./addbtn.svg" alt="" />
// //                     <p className='addnewtask'>Add New</p>

// //                 </div>
// //                 <div className='threebtntask'>
// //                     <div className='datebtntask'>Select Due Date</div>
// //                     <div className='savecanclebtn'>


// //                         <div className='canclebtntask' onClick={closePopup}>Cancel</div>
// //                         <div className='savebtntask'>Save</div>
// //                     </div>
// //                 </div>

// //             </div>
// //         </div>
// //     );
// // };

// // export default TaskPopup;


// import React, { useState } from 'react';
// import './TaskPopup.css';

// const TaskPopup = ({ closePopup }) => {
//     const [checklist, setChecklist] = useState([
//         { id: 1, text: '', checked: false },
//         { id: 2, text: '', checked: false }
//     ]);

//     const addChecklistItem = () => {
//         const newItem = { id: Date.now(), text: '', checked: false };
//         setChecklist([...checklist, newItem]);
//     };

//     const handleChecklistChange = (id, text) => {
//         setChecklist(checklist.map(item => item.id === id ? { ...item, text } : item));
//     };

//     const handleChecklistCheck = (id) => {
//         setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
//     };

//     const removeChecklistItem = (id) => {
//         setChecklist(checklist.filter(item => item.id !== id));
//     };

//     return (
//         <div className="popup-overlay">
//             <div className="popup-content">
//                 <p className='tittle'>Title  <span className='star'>*</span></p>
//                 <div>
//                     <input type="text" className='todotaskinput' placeholder='Enter Task Title' />
//                 </div>

//                 <div className='taskbtns'>
//                     <p className='tittle'>Select Priority   <span className='star'>*</span></p>
//                     <div className='taskhighpriority'>
//                         <div className='taskcirclehigh'></div>
//                         <p className='tittle'>HIGH PRIORITY</p>
//                     </div>
//                     <div className='taskhighpriority'>
//                         <div className='taskcirclemid'></div>
//                         <p className='tittle'>MODERATE PRIORITY</p>
//                     </div>
//                     <div className='taskhighpriority'>
//                         <div className='taskcirclelow'></div>
//                         <p className='tittle'>LOW PRIORITY</p>
//                     </div>
//                 </div>

//                 <div className='assinetask'>
//                     <p className='tittle'>Assign to</p>
//                     <input type="text" className='todotaskinput' placeholder='Add an assignee' />
//                 </div>

//                 <p className='tittle'>Checklist ({checklist.filter(item => item.checked).length}/{checklist.length}) <span className='star'>*</span> </p>
//                 {checklist.map(item => (
//                     <div key={item.id} className='addtaskall'>
//                         <input type="checkbox" className='taskcheckbox' checked={item.checked} onChange={() => handleChecklistCheck(item.id)} />
//                         <input 
//                             type="text" 
//                             placeholder='Add a task' 
//                             className='todotaskinputadd' 
//                             value={item.text} 
//                             onChange={(e) => handleChecklistChange(item.id, e.target.value)} 
//                         />
//                         <img src="./Delete.svg" alt="Delete" className='taskcheckboxend' onClick={() => removeChecklistItem(item.id)} />
//                     </div>
//                 ))}

//                 <div className='addbtntask' onClick={addChecklistItem}>
//                     <img src="./addbtn.svg" alt="Add" />
//                     <p className='addnewtask'>Add New</p>
//                 </div>

//                 <div className='threebtntask'>
//                     <div className='datebtntask'>Select Due Date</div>
//                     <div className='savecanclebtn'>
//                         <div className='canclebtntask' onClick={closePopup}>Cancel</div>
//                         <div className='savebtntask'>Save</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskPopup;


import React, { useState } from 'react';
import './TaskPopup.css';

const TaskPopup = ({ closePopup }) => {
    const [checklist, setChecklist] = useState([
        { id: 1, text: '', checked: false },
        { id: 2, text: '', checked: false }
    ]);
    const [dueDate, setDueDate] = useState('');
    const [showDateInput, setShowDateInput] = useState(false);

    const addChecklistItem = () => {
        const newItem = { id: Date.now(), text: '', checked: false };
        setChecklist([...checklist, newItem]);
    };

    const handleChecklistChange = (id, text) => {
        setChecklist(checklist.map(item => item.id === id ? { ...item, text } : item));
    };

    const handleChecklistCheck = (id) => {
        setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const removeChecklistItem = (id) => {
        setChecklist(checklist.filter(item => item.id !== id));
    };

    const handleDateChange = (e) => {
        setDueDate(e.target.value);
        setShowDateInput(false);
    };

    const toggleDateInput = () => {
        setShowDateInput(!showDateInput);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className='tittle'>Title  <span className='star'>*</span></p>
                <div>
                    <input type="text" className='todotaskinput' placeholder='Enter Task Title' />
                </div>
                <div className='taskbtns'>
                    <p className='tittle'>Select Priority   <span className='star'>*</span></p>
                    <div className='taskhighpriority'>
                        <div className='taskcirclehigh'></div>
                        <p className='tittle'>HIGH PRIORITY</p>
                    </div>
                    <div className='taskhighpriority'>
                        <div className='taskcirclemid'></div>
                        <p className='tittle'>MODERATE PRIORITY</p>
                    </div>
                    <div className='taskhighpriority'>
                        <div className='taskcirclelow'></div>
                        <p className='tittle'>LOW PRIORITY</p>
                    </div>
                </div>
                <div className='assinetask'>
                    <p className='tittle'>Assign to</p>
                    <input type="text" className='todotaskinput' placeholder='Add an assignee' />
                </div>
                <p className='tittle'>Checklist (1/3) <span className='star'>*</span> </p>
                <div className='checklist-container'>
                    {checklist.map((item) => (
                        <div key={item.id} className='addtaskall'>
                            <input type="checkbox" className='taskcheckbox' checked={item.checked} onChange={() => handleChecklistCheck(item.id)} />
                            <input
                                type="text"
                                placeholder='Add a task'
                                className='todotaskinputadd'
                                value={item.text}
                                onChange={(e) => handleChecklistChange(item.id, e.target.value)}
                            />
                            <img src="./Delete.svg" alt="Delete" className='taskcheckboxend' onClick={() => removeChecklistItem(item.id)} />
                        </div>
                    ))}
                </div>
                <div className='addbtntask'>
                    <p className='addnewtask' onClick={addChecklistItem}>+ Add New Task</p>
                </div>
                <div className='threebtntask'>
                    <div className='datebtntask' onClick={toggleDateInput}>Select Due Date</div>
                    {showDateInput && (
                        <input
                            type="date"
                            value={dueDate}
                            onChange={handleDateChange}
                            className='dateinput'
                        />
                    )}
                    <div className='savecanclebtn'>
                        <div className='canclebtntask' onClick={closePopup}>Cancel</div>
                        <div className='savebtntask'>Save</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskPopup;
