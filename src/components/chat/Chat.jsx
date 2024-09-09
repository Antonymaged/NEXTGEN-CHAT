import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import Detail from '../detail/Detail'

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [openinfo, setInfo] = useState(false);

    const handle = (e) => {
        setText((prev) => prev + e.emoji)
    }

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Antony</span>
                        <p>Say my name</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center"></div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" value={text} placeholder='Message' onChange={e=>setText(e.target.value)}/>
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)}/>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handle}/>
                    </div>
                </div>
                <button className='send'>Send</button>
            </div>
        </div>
    )
}

export default Chat