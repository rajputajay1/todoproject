import React from 'react'
import "./ContainerBox.css"
import { useState } from 'react'
import TaskPopup from '../Popup/TaskPopup'
const ContainerBox = ({ name, img }) => {
    const [addpopup, setAddPopup] = useState(false)

    const handleAddPopup = () => {
        setAddPopup(true)
        console.log("ajjay");
    }
    const closePopup = () => {
        setAddPopup(false);
    };
    return (
        <>
            <div className='containerbox'>


                <div className='scrollable'>

                    <div className="container-header">
                        <p className="containertext" >{name}</p>
                        <div className='addimg'>
                            <img src={img} alt="" onClick={handleAddPopup}  className='addtaskpopupopen'/>

                          
                            <img src="./collpas.svg" alt="" className='collpasbtn' />

                        </div>

                    </div>
                   
                    <div className="container-content">
                        <div className="container-header">


                            <div className="highbox">
                                <div className="circle"></div>
                                <span className="high">HIGH PRIORITY</span>
                            </div>
                            <img src="./dashdot.svg" alt="" />
                        </div>

                        <p className="herosection">Hero section</p>
                        <div className="container-header">
                            <p className="checklisttext">Checklist (1/3)</p>
                            <div className="arrowbox">

                                <img src="./dasharrow.svg" alt="" />
                            </div>
                        </div>

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
                            <img src="./dashdot.svg" alt="" />
                        </div>

                        <p className="herosection">Hero section</p>
                        <div className="container-header">
                            <p className="checklisttext">Checklist (1/3)</p>
                            <div className="arrowbox">

                                <img src="./dasharrow.svg" alt="" />
                            </div>
                        </div>

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
                            <img src="./dashdot.svg" alt="" />
                        </div>

                        <p className="herosection">Hero section</p>
                        <div className="container-header">
                            <p className="checklisttext">Checklist (1/3)</p>
                            <div className="arrowbox">

                                <img src="./dasharrow.svg" alt="" />
                            </div>
                        </div>

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