import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { useRef, useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore';

const Chat = ({ toggleDetail }) => {
    const [chat, setChat] = useState();
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const { chatId } = useChatStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior:'smooth'})
    },[]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db,"chats", chatId), (res) => {
           setChat(res.data())
        })

        return () => {
            unSub();
        };
    },[chatId]);

    const handle = (e) => {
        setText((prev) => prev + e.emoji)
    }

    const handleSend = () => {
        
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
                { chat?.messages?.map((message) => (
                    <div className="message own" key={message?.createAt}>
                        <img src="./avatar.png" alt="" />
                        <div className="text">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                            {/* <span>{message.createdAt}</span> */}
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
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
                <button className='send' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat