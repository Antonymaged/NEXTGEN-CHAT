import './Logout.css';
import { auth } from "../../../../lib/firebase"
const Logout = () => {
    return(
        <div className="Logout">
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    )
}

export default Logout;