import './chatlist.css';
import { useState } from 'react';

const Chatlist = () => {
    const [addMode,setAddMode] = useState(false);
    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder='Search'/>
                </div>
                <img id='plus' src={addMode ? "./minus.png" : "./plus.png"} alt="" onClick={() => setAddMode((prev) => !prev)}/>
            </div>
            <div className='items'>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Antony</span>
                    <p>hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chatlist