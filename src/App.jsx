import List from './components/list/List';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import Panel from './components/login&signup/panel';
import Notification from "./components/notification/Notification";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

const App = () => {

  const { currentUser, isloading, fetchUserInfo} = useUserStore()

  useEffect(()=> {
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid)
    });
    return () => {
      unSub();
    }
  },[fetchUserInfo]);

  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
      setShowDetail(prev => !prev);
  };

  if(isloading) {
    return (<div className='loading'>Loading...</div>)
  }

  return (
    <div className="container">
      {currentUser ? (
      <>
        <List/>
        <Chat toggleDetail={toggleDetail} />
        {showDetail && <Detail/>}
      </>
    ) : (
      <Panel/>
    )}
    <Notification/>
    </div>
)}

export default App