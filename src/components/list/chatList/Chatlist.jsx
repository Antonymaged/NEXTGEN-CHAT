import './chatlist.css';
import AddUser from './addUser/addUser';
import { useEffect, useState } from 'react';
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const Chatlist = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const { currentUser } = useUserStore();

    useEffect(() => {
        if (!currentUser?.id) {
            console.error('Current user ID is undefined');
            return;
        }

        const userChatsDocRef = doc(db, 'userchats', currentUser.id);

        const unSub = onSnapshot(userChatsDocRef, async (res) => {
            const items = res.data()?.chats || []; // Use optional chaining and default to an empty array

            const promises = items.map(async (item) => {
                const userdocRef = doc(db, "users", item.receiverId); // Ensure the field name is correct (receiverId)
                const userdocSnap = await getDoc(userdocRef);

                const user = userdocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser?.id]); // Ensure dependency is valid

    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder='Search'/>
                </div>
                <img
                    id='plus'
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt=""
                    onClick={() => setAddMode(prev => !prev)}
                />
            </div>
            {chats.map(chat => (
                <div className='items' key={chat.chatId}>
                    <img src={chat.user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user?.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default Chatlist;
