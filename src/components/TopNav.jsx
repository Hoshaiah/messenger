import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/actionServices";
import SearchBar from "./SearchBar";
import { setAuthorization } from "../redux/currentuserSlice";
import Cookies from "js-cookie";

function TopNav () {
    const currentuser = useSelector((state) => state.currentuser)
    const dispatch = useDispatch()

    const handleLogoutClick = async () => {
        const logoutData = await logoutUser(currentuser.authorization)
        if (logoutData.status === 200) {
            dispatch(setAuthorization(''))
            Cookies.remove('jwt_token');

        }
    }

    return (
        <div class="flex items-center justify-center w-full h-10 bg-slate-400" >
            <SearchBar/>
            <button onClick={handleLogoutClick} >Logout</button>
        </div>
    )
}

export default TopNav;