import './addUser.css';
import { collection, arrayUnion, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = ({ addMode, setAddMode }) => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);
            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async () => {
        if (!user || !currentUser) return;

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");

        try {
            const userChatsDocRef = doc(db, "userchats", currentUser.id);
            const userChatsSnap = await getDoc(userChatsDocRef);

            const existingChats = userChatsSnap.data()?.chats || [];
            const existingChat = existingChats.find(chat => chat.receiverId === user.id);

            if (existingChat) {
                console.log("Chat already exists.");
                return;
            }

            const newChatRef = doc(chatRef);

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            await setDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            }, { merge: true });

            await setDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            }, { merge: true });

            console.log("Chat created successfully.");
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = () => {
        setAddMode(!addMode);
    }

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="details">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={() => {handleAdd(); handleChange();}} >Add user</button>
            </div>}
        </div>
    );
};

export default AddUser;
