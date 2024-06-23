import React from 'react'
import "./ContainerBox.css"
import { useState } from 'react'
import TaskPopup from '../Popup/TaskPopup'
import Delet from '../popups/delete/Delet'
const ContainerBox = ({ name, img }) => {
    const [addpopup, setAddPopup] = useState(false)
    const [colapps, setColapps] = useState(true)

    const [deletepopup, setDeletePopup] = useState(false)

    const [sharepopup, setSharepopup] = useState(false)

    const handleAddPopup = () => {
        setAddPopup(true)
        console.log("ajjay");
    }
    const closePopup = () => {
        setAddPopup(false);
    };

    const handlecolaps = () => {
        setColapps(false)
        console.log("ajay");
    }
    const handlecalappsclose = () => {
        setColapps(true)
    }

    const handleshare = () => {
        setSharepopup(true)
    }
    const handleshareclose = () => {
        setSharepopup(false)
    }

    const handleallcolopass = () => {
        setColapps(!colapps); // Toggle the state
    };

    const handledelete = () => {
        setDeletePopup(true)
    }
    const handledeleteclose = () => {
        setDeletePopup(false)
    }
    return (
        <>
            <div className='containerbox'>


                <div className='scrollable'>

                    <div className="container-header">
                        <p className="containertext" >{name}</p>
                        <div className='addimg'>
                            <img src={img} alt="" onClick={handleAddPopup} className='addtaskpopupopen' />


                            <img src="./collpas.svg" alt="" className='collpasbtn' onClick={handleallcolopass} />

                        </div>

                    </div>

                    <div className="container-content">
                        <div className="container-header">


                            <div className="highbox">
                                <div className="circle"></div>
                                <span className="high">HIGH PRIORITY</span>
                            </div>
                            <div className='ppp'>


                                <img src="./dashdot.svg" alt="" onClick={handleshare} className='dashdot' />
                                {sharepopup && (
                                    <div className='sharepopop' onClick={handleshareclose}>
                                        <p className=''>Edit</p>
                                        <p className='sharepopopbtns'>Share</p>
                                        <p className='delteeshare' onClick={handledelete}>Delete</p>

                                    </div>
                                )}
                                {deletepopup && (
                                    <div>
                                        <Delet onClose={handledeleteclose} text="Delete" />
                                    </div>
                                )}

                            </div>
                        </div>

                        <p className="herosection">Hero section</p>
                        <div className="container-header">
                            <p className="checklisttext">Checklist (1/3)</p>
                            <div className="arrowbox">

                                {colapps === true ? <img src="./dasharrow.svg" alt="" onClick={handlecolaps} /> : <img src="./downarrow.svg" alt="" onClick={handlecalappsclose} />}
                                {/* <img src="./dasharrow.svg" alt="" onClick={handlecolaps} /> */}

                            </div>
                        </div>

                        {colapps && (
                            <div>



                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done</p>

                                </div>
                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done</p>

                                </div>
                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done ede lorem
                                        Ipsum is a Dummy text t</p>

                                </div>
                            </div>
                        )}

                        <div className="allbtns">


                            <div className="dateinner">
                                <p>10 feb</p>
                            </div>
                            <div className="prioritybtns">


                                <div className="btnspriorty">
                                    <p>PROGRESS</p>
                                </div>
                                <div className="btnspriorty">
                                    <p>TO-DO</p>
                                </div>
                                <div className="btnspriorty">
                                    <p>DONE</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="container-content">
                        <div className="container-header">


                            <div className="highbox">
                                <div className="circle"></div>
                                <span className="high">HIGH PRIORITY</span>
                            </div>
                            <div className='ppp'>


                                <img src="./dashdot.svg" alt="" onClick={handleshare} className='dashdot' />
                                {sharepopup && (
                                    <div className='sharepopop' onClick={handleshareclose}>
                                        <p className=''>Edit</p>
                                        <p className='sharepopopbtns'>Share</p>
                                        <p className='delteeshare' onClick={handledelete}>Delete</p>

                                    </div>
                                )}
                                {deletepopup && (
                                    <div>
                                        <Delet onClose={handledeleteclose} text="Delete" />
                                    </div>
                                )}

                            </div>
                        </div>

                        <p className="herosection">Hero section</p>
                        <div className="container-header">
                            <p className="checklisttext">Checklist (1/3)</p>
                            <div className="arrowbox">

                                {colapps === true ? <img src="./dasharrow.svg" alt="" onClick={handlecolaps} /> : <img src="./downarrow.svg" alt="" onClick={handlecalappsclose} />}
                                {/* <img src="./dasharrow.svg" alt="" onClick={handlecolaps} /> */}

                            </div>
                        </div>

                        {colapps && (
                            <div>



                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done</p>

                                </div>
                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done</p>

                                </div>
                                <div className="innerbox">
                                    <input type="checkbox" className="checkbox" />
                                    <p className="innerboxtext">Task to be done ede lorem
                                        Ipsum is a Dummy text t</p>

                                </div>
                            </div>
                        )}

                        <div className="allbtns">


                            <div className="dateinner">
                                <p>10 feb</p>
                            </div>
                            <div className="prioritybtns">


                                <div className="btnspriorty">
                                    <p>PROGRESS</p>
                                </div>
                                <div className="btnspriorty">
                                    <p>TO-DO</p>
                                </div>
                                <div className="btnspriorty">
                                    <p>DONE</p>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>

            </div>

            {addpopup && <TaskPopup closePopup={closePopup} />}
        </>
    )
}

export default ContainerBox