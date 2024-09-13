import './userinfo.css';
import { useUserStore } from "../../../lib/userStore"
import { useState } from 'react';
import Logout from "./logout/logout"

const Userinfo = () => {

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
            {logout && <Logout/>}
        </div>
    )
}

export default Userinfo;