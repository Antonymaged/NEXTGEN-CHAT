import './addUser.css';

const AddUser = () => {
    return(
        <div className="addUser">
            <form>
                <input type="text" placeholder='Username' name='Username'/>
                <button>Search</button>
            </form>
            <div className="user">
                <div className="details">
                    <img src="./avatar.png" alt="" />
                    <span>Antony</span>
                </div>
                <button>Add user</button>
            </div>
        </div>
    )
}

export default AddUser;