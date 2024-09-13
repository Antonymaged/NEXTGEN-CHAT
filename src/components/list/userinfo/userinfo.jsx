import './userinfo.css';
import { useUserStore } from "../../../lib/userStore"
import React, { useState } from 'react';
import Logout  from "./logout/logout"
import {Light} from './Lightmode/ligtmode'

const Userinfo = ({isDark, setIsDark}) => {

    const { currentUser } = useUserStore();
    const [logout,setLogout] = useState(false);

    return (
        <div className='userinfo'>
            <div className="user">
                <img src={currentUser.avatar || "./avatar.png"} alt="" />
                <h2>{currentUser.username}</h2>
            </div>
            <div className="icons">
                <img src="./more.png" alt="" onClick={() => setLogout((prev) => !prev)}/>
                <img src="./edit.png" alt="" />
            </div>
            {
                logout && <div className="contain">
                    <Light isDark={isDark} setIsDark={setIsDark}/>
                    <Logout/>
                </div>
            }
        </div>
    )
}

export default Userinfo;