import './details.css';
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase'

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
    const { currentUser } = useUserStore();

    const handleBlock = async () => {
        if(!user) return;

        const userRef = doc(db, "users", currentUser.id)

        try {
            await updateDoc(userRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='detail'>
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>son of pharaos</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./pharaoh.jpg" alt="" />
                                <span>king tut</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./pharaoh.jpg" alt="" />
                                <span>king tut</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./pharaoh.jpg" alt="" />
                                <span>king tut</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./pharaoh.jpg" alt="" />
                                <span>king tut</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./pharaoh.jpg" alt="" />
                                <span>king tut</span>
                            </div>
                            <img src="./download.png" alt="" className='icon'/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>{
                    isCurrentUserBlocked ? "you are Blocked!" : isReceiverBlocked ? "user Blocked" : "Block user"
                }</button>
            </div>
        </div>
    )
}

export default Detail