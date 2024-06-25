// import React, { useState } from 'react';
// import './ContainerBox.css';
// import TaskPopup from '../Popup/TaskPopup';
// import Delet from '../popups/delete/Delet';
// import { useDispatch } from 'react-redux';
// import { updateTaskStatus, removeTask, updateChecklistChecked } from '../../Features/TodoSlice';

// const ContainerBox = ({ name, img, data }) => {
//     const [addpopup, setAddPopup] = useState(false);
//     const [colapps, setColapps] = useState(true);
//     const [deletepopup, setDeletePopup] = useState(false);
//     const [sharepopup, setSharepopup] = useState(false);
//     const [taskToDelete, setTaskToDelete] = useState(null);

//     const dispatch = useDispatch();

//     const handleAddPopup = () => setAddPopup(true);
//     const closePopup = () => setAddPopup(false);
//     const handleColaps = () => setColapps(false);
//     const handleCalapsClose = () => setColapps(true);
//     const handleShare = () => setSharepopup(true);
//     const handleShareClose = () => setSharepopup(false);
//     const handleAllColaps = () => setColapps(!colapps);

//     const handleDelete = (taskId) => {
//         setTaskToDelete(taskId);
//         setDeletePopup(true);
//     };

//     const handleDeleteClose = () => {
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const confirmDelete = () => {
//         if (taskToDelete) {
//             dispatch(removeTask(taskToDelete));
//         }
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const changeTaskStatus = (taskId, newStatus) => {
//         dispatch(updateTaskStatus({ id: taskId, newStatus }));
//     };

//     const updateChecklistItem = (taskId, text, checked) => {
//         dispatch(updateChecklistChecked({ id: taskId, text, checked }));
//     };

//     const addNewTask = (newTask) => {
//         // Normally you would add the new task to your data source (Redux state, API, etc.)
//         // For demonstration, let's assume we're adding directly to the data state
//         setData([...data, newTask]);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
//     };

//     const currentDate = new Date(); // Get current date

//     return (
//         <>
//             <div className='containerbox'>
//                 <div className='scrollable'>
//                     <div className="container-header">
//                         <p className="containertext">{name}</p>
//                         <div className='addimg'>
//                             {img && name === "To do" && <img src={img} alt="Add Task" onClick={handleAddPopup} className='addtaskpopupopen' />}
//                             <img src="./collpas.svg" alt="Collapse" className='collpasbtn' onClick={handleAllColaps} />
//                         </div>
//                     </div>
//                     <div className=" ">

//                         {data.map(task => (
//                             <div className="container-content" key={task.id}>
//                                 <div className="task-content">
//                                     <div className="container-header">
//                                         <div className="highbox">
//                                             <div className="circle"></div>
//                                             <span className="high">{task.priority.toUpperCase()} PRIORITY</span>
//                                         </div>
//                                         <div className='ppp'>
//                                             <img src="./dashdot.svg" alt="Options" id={task.id} onClick={handleShare} className='dashdot' />
//                                             {sharepopup && (
//                                                 <div className='sharepopop' onClick={handleShareClose}>
//                                                     <p>Edit</p>
//                                                     <p className='sharepopopbtns'>Share</p>
//                                                     <p className='delteeshare' onClick={() => handleDelete(task.id)}>Delete</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <p className="herosection">{task.title}</p>

//                                     <div className="container-header">
//                                         <p className="checklisttext">Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})</p>
//                                         <div className="arrowbox">
//                                             {colapps ? <img src="./dasharrow.svg" alt="Collapse" onClick={handleColaps} /> : <img src="./downarrow.svg" alt="Expand" onClick={handleCalapsClose} />}
//                                         </div>
//                                     </div>

//                                     {colapps && (
//                                         <div className="checklist">
//                                             {task.checklist.map((item, index) => (
//                                                 <div className="innerbox" key={index}>
//                                                     <input
//                                                         type="checkbox"
//                                                         className="checkbox"
//                                                         checked={item.checked}
//                                                         onChange={() => updateChecklistItem(task.id, item.text, !item.checked)}
//                                                     />
//                                                     <p className="innerboxtext">{item.task}</p> {/* Ensure item.text is correctly accessed */}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}

//                                     <div className="allbtns">
//                                         {task.dueDate ?
//                                             <div className="dateinner" style={{ backgroundColor: new Date(task.dueDate) < currentDate && task.status === 'done' ? 'green' : 'red' }}>
//                                                 <p>{formatDate(task.dueDate)}</p>
//                                             </div>
//                                             : <div className='dateinner'></div>}
                                    
//                                         <div className="prioritybtns">
//                                             {task.status !== 'backlog' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'backlog')}>
//                                                     <p>BACKLOG</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'to-do' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'to-do')}>
//                                                     <p>TO-DO</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'inProgress' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'inProgress')}>
//                                                     <p>IN PROGRESS</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'done' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'done')}>
//                                                     <p>DONE</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             {addpopup && <TaskPopup closePopup={closePopup} addNewTask={addNewTask} />}
//             {deletepopup && (
//                 <Delet onClose={handleDeleteClose} onConfirm={confirmDelete} text="delete this task" />
//             )}
//         </>
//     );
// };

// export default ContainerBox;

// import React, { useState } from 'react';
// import './ContainerBox.css';
// import TaskPopup from '../Popup/TaskPopup';
// import { useDispatch } from 'react-redux';
// import { removeTask, updateTaskStatus, updateChecklistChecked } from '../../Features/TodoSlice';

// const ContainerBox = ({ name, img, data }) => {
//     const [addpopup, setAddPopup] = useState(false);
//     const [editpopup, setEditPopup] = useState(false); // State for edit popup
//     const [taskToEdit, setTaskToEdit] = useState(null); // State to hold task data for editing
//     const [deletepopup, setDeletePopup] = useState(false);
//     const [sharepopup, setSharepopup] = useState(false);
//     const [taskToDelete, setTaskToDelete] = useState(null);

//     const dispatch = useDispatch();

//     const handleAddPopup = () => setAddPopup(true);
//     const closePopup = () => {
//         setAddPopup(false);
//         setEditPopup(false); // Close edit popup when adding new task
//     };
//     const handleEditPopup = (task) => {
//         setTaskToEdit(task);
//         setEditPopup(true);
//     };
//     const handleDelete = (taskId) => {
//         setTaskToDelete(taskId);
//         setDeletePopup(true);
//     };

//     const handleDeleteClose = () => {
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const confirmDelete = () => {
//         if (taskToDelete) {
//             dispatch(removeTask(taskToDelete));
//         }
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const changeTaskStatus = (taskId, newStatus) => {
//         dispatch(updateTaskStatus({ id: taskId, newStatus }));
//     };

//     const updateChecklistItem = (taskId, text, checked) => {
//         dispatch(updateChecklistChecked({ id: taskId, text, checked }));
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
//     };

//     const currentDate = new Date(); // Get current date

//     return (
//         <>
//             <div className='containerbox'>
//                 <div className='scrollable'>
//                     <div className="container-header">
//                         <p className="containertext">{name}</p>
//                         <div className='addimg'>
//                             {img && name === "To do" && <img src={img} alt="Add Task" onClick={handleAddPopup} className='addtaskpopupopen' />}
//                             <img src="./collpas.svg" alt="Collapse" className='collpasbtn' />
//                         </div>
//                     </div>
//                     <div className=" ">

//                         {data.map(task => (
//                             <div className="container-content" key={task.id}>
//                                 <div className="task-content">
//                                     <div className="container-header">
//                                         <div className="highbox">
//                                             <div className="circle"></div>
//                                             <span className="high">{task.priority.toUpperCase()} PRIORITY</span>
//                                         </div>
//                                         <div className='ppp'>
//                                             <img src="./dashdot.svg" alt="Options" onClick={() => setSharepopup(true)} className='dashdot' />
//                                             {sharepopup && (
//                                                 <div className='sharepopop' onClick={() => setSharepopup(false)}>
//                                                      <p onClick={() => handleEditPopup(task)} className='editbtn' >edit</p>

//                                                     {/* <p onClick={handleEditPopup(task)}>Edit</p> */}
//                                                     <p className='sharepopopbtns'>Share</p>
//                                                     <p className='delteeshare' onClick={() => handleDelete(task.id)}>Delete</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <p className="herosection">{task.title}</p>

//                                     <div className="container-header">
//                                         <p className="checklisttext">Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})</p>
//                                     </div>

//                                     <div className="allbtns">
//                                         {task.dueDate ?
//                                             <div className="dateinner" style={{ backgroundColor: new Date(task.dueDate) < currentDate && task.status === 'done' ? 'green' : 'red' }}>
//                                                 <p>{formatDate(task.dueDate)}</p>
//                                             </div>
//                                             : <div className='dateinner'></div>}
                                    
//                                         <div className="prioritybtns">
//                                             {task.status !== 'backlog' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'backlog')}>
//                                                     <p>BACKLOG</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'to-do' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'to-do')}>
//                                                     <p>TO-DO</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'inProgress' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'inProgress')}>
//                                                     <p>IN PROGRESS</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'done' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'done')}>
//                                                     <p>DONE</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Edit Button */}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             {addpopup && <TaskPopup closePopup={closePopup} />}
//             {editpopup && <TaskPopup closePopup={() => setEditPopup(false)} task={taskToEdit} />}
//             {deletepopup && (
//                 <div>Delete Popup Placeholder</div>
//             )}
//         </>
//     );
// };

// export default ContainerBox;


// import React, { useState } from 'react';
// import './ContainerBox.css';
// import TaskPopup from '../Popup/TaskPopup';
// import { useDispatch } from 'react-redux';
// import { removeTask, updateTaskStatus, updateChecklistChecked } from '../../Features/TodoSlice';

// const ContainerBox = ({ name, img, data }) => {
//     const [addpopup, setAddPopup] = useState(false);
//     const [editpopup, setEditPopup] = useState(false); // State for edit popup
//     const [taskToEdit, setTaskToEdit] = useState(null); // State to hold task data for editing
//     const [deletepopup, setDeletePopup] = useState(false);
//     const [sharepopup, setSharepopup] = useState(false);
//     const [taskToDelete, setTaskToDelete] = useState(null);
//     const [collapsed, setCollapsed] = useState(false); // State for collapse functionality

//     const dispatch = useDispatch();

//     const handleAddPopup = () => setAddPopup(true);
//     const closePopup = () => {
//         setAddPopup(false);
//         setEditPopup(false); // Close edit popup when adding new task
//     };
//     const handleEditPopup = (task) => {
//         setTaskToEdit(task);
//         setEditPopup(true);
//     };
//     const handleDelete = (taskId) => {
//         setTaskToDelete(taskId);
//         setDeletePopup(true);
//     };

//     const handleDeleteClose = () => {
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const confirmDelete = () => {
//         if (taskToDelete) {
//             dispatch(removeTask(taskToDelete));
//         }
//         setDeletePopup(false);
//         setTaskToDelete(null);
//     };

//     const changeTaskStatus = (taskId, newStatus) => {
//         dispatch(updateTaskStatus({ id: taskId, newStatus }));
//     };

//     const updateChecklistItem = (taskId, text, checked) => {
//         dispatch(updateChecklistChecked({ id: taskId, text, checked }));
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
//     };

//     const currentDate = new Date(); // Get current date

//     const toggleCollapse = () => {
//         setCollapsed(!collapsed);
//     };

//     return (
//         <>
//             <div className='containerbox'>
//                 <div className='scrollable'>
//                     <div className="container-header">
//                         <p className="containertext">{name}</p>
//                         <div className='addimg'>
//                             {img && name === "To do" && <img src={img} alt="Add Task" onClick={handleAddPopup} className='addtaskpopupopen' />}
//                             <img src="./collpas.svg" alt="Collapse" className='collpasbtn' onClick={toggleCollapse} />
//                         </div>
//                     </div>
//                     <div className=" ">

//                         {data.map(task => (
//                             <div className="container-content" key={task.id}>
//                                 <div className="task-content">
//                                     <div className="container-header">
//                                         <div className="highbox">
//                                             <div className="circle"></div>
//                                             <span className="high">{task.priority.toUpperCase()} PRIORITY</span>
//                                         </div>
//                                         <div className='ppp'>
//                                             <img src="./dashdot.svg" alt="Options" onClick={() => setSharepopup(true)} className='dashdot' />
//                                             {sharepopup && (
//                                                 <div className='sharepopop' onClick={() => setSharepopup(false)}>
//                                                     <p onClick={() => handleEditPopup(task)} className='editbtn'>Edit</p>
//                                                     <p className='sharepopopbtns'>Share</p>
//                                                     <p className='delteeshare' onClick={() => handleDelete(task.id)}>Delete</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <p className="herosection">{task.title}</p>

//                                     <div className="container-header">
//                                         <p className="checklisttext">Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})</p>
//                                         <div className="arrowbox">
//                                             {collapsed ? <img src="./dasharrow.svg" alt="Collapse" onClick={toggleCollapse} /> : <img src="./downarrow.svg" alt="Expand" onClick={toggleCollapse} />}
//                                         </div>
//                                     </div>

//                                     {collapsed && (
//                                         <div className="checklist">
//                                             {task.checklist.map((item, index) => (
//                                                 <div className="innerbox" key={index}>
//                                                     <input
//                                                         type="checkbox"
//                                                         className="checkbox"
//                                                         checked={item.checked}
//                                                         onChange={() => updateChecklistItem(task.id, item.text, !item.checked)}
//                                                     />
//                                                     <p className="innerboxtext">{item.task}</p> {/* Ensure item.text is correctly accessed */}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}

//                                     <div className="allbtns">
//                                         {task.dueDate ?
//                                             <div className="dateinner" style={{ backgroundColor: new Date(task.dueDate) < currentDate && task.status === 'done' ? 'green' : 'red' }}>
//                                                 <p>{formatDate(task.dueDate)}</p>
//                                             </div>
//                                             : <div className='dateinner'></div>}
                                    
//                                         <div className="prioritybtns">
//                                             {task.status !== 'backlog' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'backlog')}>
//                                                     <p>BACKLOG</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'to-do' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'to-do')}>
//                                                     <p>TO-DO</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'inProgress' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'inProgress')}>
//                                                     <p>IN PROGRESS</p>
//                                                 </div>
//                                             )}
//                                             {task.status !== 'done' && (
//                                                 <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'done')}>
//                                                     <p>DONE</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             {addpopup && <TaskPopup closePopup={closePopup} />}
//             {editpopup && <TaskPopup closePopup={() => setEditPopup(false)} task={taskToEdit} />}
//             {deletepopup && (
//                 <div>Delete Popup Placeholder</div>
//             )}
//         </>
//     );
// };

// export default ContainerBox;

import React, { useState } from 'react';
import './ContainerBox.css';
import TaskPopup from '../Popup/TaskPopup';
import { useDispatch } from 'react-redux';
import { removeTask, updateTaskStatus, updateChecklistChecked } from '../../Features/TodoSlice';

const ContainerBox = ({ name, img, data }) => {
    const [addpopup, setAddPopup] = useState(false);
    const [editpopup, setEditPopup] = useState(false); // State for edit popup
    const [taskToEdit, setTaskToEdit] = useState(null); // State to hold task data for editing
    const [deletepopup, setDeletePopup] = useState(false);
    const [sharepopup, setSharepopup] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [collapsedTasks, setCollapsedTasks] = useState([]); // State to store collapsed tasks
    const dispatch = useDispatch();

    const handleAddPopup = () => setAddPopup(true);
    const closePopup = () => {
        setAddPopup(false);
        setEditPopup(false); // Close edit popup when adding new task
    };
    const handleEditPopup = (task) => {
        setTaskToEdit(task);
        setEditPopup(true);
    };
    const handleDelete = (taskId) => {
        setTaskToDelete(taskId);
        setDeletePopup(true);
    };

    const handleDeleteClose = () => {
        setDeletePopup(false);
        setTaskToDelete(null);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            dispatch(removeTask(taskToDelete));
        }
        setDeletePopup(false);
        setTaskToDelete(null);
    };

    const changeTaskStatus = (taskId, newStatus) => {
        dispatch(updateTaskStatus({ id: taskId, newStatus }));
    };

    const updateChecklistItem = (taskId, text, checked) => {
        dispatch(updateChecklistChecked({ id: taskId, text, checked }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    };

    const currentDate = new Date(); // Get current date

    const toggleCollapse = (taskId) => {
        if (collapsedTasks.includes(taskId)) {
            setCollapsedTasks(collapsedTasks.filter(id => id !== taskId));
        } else {
            setCollapsedTasks([...collapsedTasks, taskId]);
        }
        console.log(collapsedTasks)
    };
    const handleAllColaps =()=>{
        setCollapsedTasks(data)
        console.log(collapsedTasks)
    }

    return (
        <>
            <div className='containerbox'>
                <div className='scrollable'>
                    <div className="container-header">
                        <p className="containertext">{name}</p>
                        <div className='addimg'>
                            {img && name === "To do" && <img src={img} alt="Add Task" onClick={handleAddPopup} className='addtaskpopupopen' />}
                            <img src="./collpas.svg" alt="Collapse" className='collpasbtn' onClick={handleAllColaps} />
                        </div>
                    </div>
                    <div className=" ">

                        {data.map(task => (
                            <div className="container-content" key={task.id}>
                                <div className="task-content">
                                    <div className="container-header">
                                        <div className="highbox">
                                            <div className="circle"></div>
                                            <span className="high">{task.priority.toUpperCase()} PRIORITY</span>
                                        </div>
                                        <div className='ppp'>
                                            <img src="./dashdot.svg" alt="Options" onClick={() => setSharepopup(true)} className='dashdot' />
                                            {sharepopup && (
                                                <div className='sharepopop' onClick={() => setSharepopup(false)}>
                                                    <p onClick={() => handleEditPopup(task)} className='editbtn'>Edit</p>
                                                    <p className='sharepopopbtns'>Share</p>
                                                    <p className='delteeshare' onClick={() => handleDelete(task.id)}>Delete</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="herosection">{task.title}</p>

                                    <div className="container-header">
                                        <p className="checklisttext">Checklist ({task.checklist.filter(item => item.checked).length}/{task.checklist.length})</p>
                                        <div className="arrowbox" onClick={() => toggleCollapse(task.id)}>
                                            <img
                                                src={collapsedTasks.includes('all') ? "./dasharrow.svg" : "./downarrow.svg"}
                                                alt={collapsedTasks.includes('all') ? "Expand" : "Collapse"}
                                                
                                            />
                                        </div>
                                    </div>

                                    {collapsedTasks.includes(task.id) && (
                                        <div className="checklist">
                                            {task.checklist.map((item, index) => (
                                                <div className="innerbox" key={index}>
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => updateChecklistItem(task.id, item.text, !item.checked)}
                                                    />
                                                    <p className="innerboxtext">{item.task}</p> 
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="allbtns">
                                        {task.dueDate ?
                                            <div className="dateinner" style={{ backgroundColor: new Date(task.dueDate) < currentDate && task.status === 'done' ? 'green' : 'red' }}>
                                                <p>{formatDate(task.dueDate)}</p>
                                            </div>
                                            : <div className='dateinner'></div>}
                                    
                                        <div className="prioritybtns">
                                            {task.status !== 'backlog' && (
                                                <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'backlog')}>
                                                    <p>BACKLOG</p>
                                                </div>
                                            )}
                                            {task.status !== 'to-do' && (
                                                <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'to-do')}>
                                                    <p>TO-DO</p>
                                                </div>
                                            )}
                                            {task.status !== 'inProgress' && (
                                                <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'inProgress')}>
                                                    <p>IN PROGRESS</p>
                                                </div>
                                            )}
                                            {task.status !== 'done' && (
                                                <div className="btnspriorty" onClick={() => changeTaskStatus(task.id, 'done')}>
                                                    <p>DONE</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {addpopup && <TaskPopup closePopup={closePopup} />}
            {editpopup && <TaskPopup closePopup={() => setEditPopup(false)} task={taskToEdit} />}
            {deletepopup && (
                <div>Delete Popup Placeholder</div>
            )}
        </>
    );
};

export default ContainerBox;
