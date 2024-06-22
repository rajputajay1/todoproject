import React from 'react';
import './TaskPopup.css';

const TaskPopup = ({ closePopup }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p className='tittle'>Title  <span className='star'>*</span></p>
                <div>


                    <input type="text" className='todotaskinput'
                        placeholder='Enter Task Title'
                    />
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
                    <input type="text" className='todotaskinput'
                        placeholder='Add a assignee'
                    />
                </div>
                <p className='tittle'>Checklist (1/3) <span className='star'>*</span> </p>
                <div className='addtaskall'>
                    <input type="checkbox" className='taskcheckbox' />
                    <input type="text" placeholder='Add a task' className='todotaskinputadd' />
                    <img src="./Delete.svg" alt="Delete" className='taskcheckboxend' />
                </div>
                <div className='addtaskall'>
                    <input type="checkbox" className='taskcheckbox' />
                    <input type="text"
                        placeholder='Add a task'
                        className='todotaskinputadd'
                    />
                    <img src="./Delete.svg" alt="" className='taskcheckboxend' />

                </div>


                <div className='addbtntask'>
                    <img src="./addbtn.svg" alt="" />
                    <p className='addnewtask'>Add New</p>

                </div>
                <div className='threebtntask'>
                    <div className='datebtntask'>Select Due Date</div>
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
