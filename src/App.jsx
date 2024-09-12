import List from './components/list/List';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import Panel from './components/login&signup/panel';
import Notification from "./components/notification/Notification";
import React, { useState } from 'react';

const App = () => {

  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
      setShowDetail(prev => !prev);
  };

  const user = true;

  return (
    <div className="container">
      {user ? (
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