import './list.css';
import Userinfo from './userinfo/Userinfo';
import Chatlist from './chatList/Chatlist';

const List = ({ isDark, setIsDark }) => {
    return (
        <div className='list'>
            <Userinfo isDark={isDark} setIsDark={setIsDark}/>
            <Chatlist/>
        </div>
    )
}

export default List