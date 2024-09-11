import List from './components/list/List';
import Chat from './components/chat/Chat';
import Detail from './components/detail/Detail';
import Panel from './components/login&signup/panel';
import React, { useState } from 'react';

const App = () => {

  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
      setShowDetail(prev => !prev);
  };

  return (
    <div className='container'>
      {/* <List/>
      <Chat toggleDetail={toggleDetail} />
      {showDetail && <Detail />} */}
      <Panel/>
    </div>
  )
}

export default App