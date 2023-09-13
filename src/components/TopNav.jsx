import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../services/actionServices";
import SearchBar from "./SearchBar";
import { setAuthorization, setCurrentUserInfo } from "../redux/currentuserSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function TopNav () {
    const navigate = useNavigate()
    const currentuser = useSelector((state) => state.currentuser)
    const dispatch = useDispatch()

    const handleLogoutClick = async () => {
        const logoutData = await logoutUser(currentuser.authorization)
        if (logoutData.status === 200) {
            dispatch(setAuthorization(''))
            Cookies.remove('jwt_token');
            Cookies.remove('user_id');
            localStorage.userInfo = ''
            dispatch(setCurrentUserInfo({}))
        } else if (logoutData.status > 400 ) {
            dispatch(setAuthorization(''))
            Cookies.remove('jwt_token');
            Cookies.remove('user_id');
            localStorage.userInfo = ''
            dispatch(setCurrentUserInfo({}))
            navigate('/login')
        }
    }

    return (
        <div class="flex items-center justify-center w-full h-10 bg-slate-800 border border-slate-600 overflow-visible" >
            <SearchBar/>
            <button class= 'absolute right-0 mr-2 text-white' onClick={handleLogoutClick} >Logout</button>
        </div>
    )
}

export default TopNav;