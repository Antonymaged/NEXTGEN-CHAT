import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { useRef, useState, useEffect } from 'react';
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const Chat = ({ toggleDetail }) => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  useEffect(() => {
    if (isCameraOpen) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
        });
    } else {
      stopCameraStream();
    }
  }, [isCameraOpen]);

  const stopCameraStream = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleSend = async () => {
    if (text === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async id => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  const startCall = (type) => {
    const roomId = `chat-${chatId}`;
    let callUrl = '';

    if (type === 'audio') {
      callUrl = `https://meet.jit.si/${roomId}?audioOnly=true`;
    } else {
      callUrl = `https://meet.jit.si/${roomId}`;
    }

    window.open(callUrl, '_blank');
  };

  const handleCameraCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        setImg({ file, url: URL.createObjectURL(file) });

        stopCameraStream();
        setIsCameraOpen(false);

        await handleSend();
      }, 'image/jpeg');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if you're using a form
      handleSend();
    }
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
          </div>
        </div>
        <div className="icons">
          <img src="./video.png" alt="Video Call" onClick={() => startCall('video')} />
          <img src="./info.png" alt="Info" onClick={toggleDetail} />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message?.createdAt}>
            <img src={message.senderId === currentUser.id ? (currentUser?.avatar || "./avatar.png") : (user?.avatar || "./avatar.png")} alt="" />
            <div className="text">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isCameraOpen && (
          <div className="camera-container">
            <video ref={videoRef} style={{ width: '100%' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <div className="camera-ctrl">
              <button onClick={handleCameraCapture}>Capture</button>
              <button onClick={() => { stopCameraStream(); setIsCameraOpen(false); }}>Close Camera</button>
            </div>
          </div>
        )}
        {img.url && (
          <div className="message own">
            <div className="text">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file" disabled={isCurrentUserBlocked && isReceiverBlocked}>
            <img src="./img.png" alt="" />
          </label>
          <input type='file' id='file' style={{ display: "none" }} onChange={handleImg} disabled={isCurrentUserBlocked || isReceiverBlocked} />
          <img src="./camera.png" alt="Camera" onClick={() => setIsCameraOpen(true)} />
        </div>
        <input type="text" value={text} onKeyDown={handleKeyDown} placeholder='Message' id='textInput' onChange={e => setText(e.target.value)} disabled={isCurrentUserBlocked || isReceiverBlocked} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
          <div className="picker">
            <EmojiPicker open={open && !isCurrentUserBlocked && !isReceiverBlocked} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='send' id='submitButton' onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
