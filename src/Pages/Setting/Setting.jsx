import React from 'react'
import "./Setting.css"

const Setting = () => {
    return (
        <>
            <div className='settingcontainer'>


                <p className='setting'>Setting</p>
                <div>
                    <div className="input-container">
                        <img src="./Profile.svg" alt="" className='icon-class' />
                        <input type="text" placeholder='Name' />
                    </div>
                    <div className="input-container">
                        <img src="./mails.svg" alt="" className='icon-class' />
                        <input type="text" placeholder='Update Email' />
                    </div>
                    <div className="input-container">
                        <img src="./pass.svg" alt="" className='icon-class' />
                        <input type="text" placeholder='Old Password' />
                        <img src="./seen.svg" alt="" className='icon-class-end' />
                    </div>
                    <div className="input-container">
                        <img src="./Profile.svg" alt="" className='icon-class' />
                        <input type="text" placeholder='New Password' />
                        <img src="./seen.svg" alt="" className='icon-class-end' />

                    </div>
                    <div className='updatebtn'>
                        <p className='updatetext'>Update</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting