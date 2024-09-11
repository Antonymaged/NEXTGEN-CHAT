import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

const c = false;

const Chat = ({ toggleDetail }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    
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
                    <img src="./info.png" alt="" onClick={ toggleDetail }/>
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>Hello today was so hard but i can do it</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>good to hear from you , you can do it i know that</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>but i am really tired</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <img src="../../../public/pharaoh.jpg" alt="" />
                        <p>but you are a pharaoh</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="text">
                        <p>yes i am.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
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