import { useRef, useEffect, useState } from "react";
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
    const [friendBox, setFriendBox] = useState()
    const friendDiv = useRef()
    const friendRequestButton = useRef()

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

    useEffect(() => {
        function handleClickOutside(event) {
          if (friendDiv.current && !friendDiv.current.contains(event.target) && event.target!== friendRequestButton.current) {
            setFriendBox(false)
          }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        <div class="flex items-center justify-center w-full h-10 bg-slate-800 border border-slate-600 overflow-visible" >
            <SearchBar/>
            <button ref={friendRequestButton} class= 'absolute right-28 mr-2 text-white' onClick={() => {setFriendBox(true)}} >Friend Requests</button>
            <button class= 'absolute right-5 mr-2 text-white' onClick={handleLogoutClick} >Logout</button>
            {friendBox && <div ref={friendDiv} class='absolute right-16 w-60 h-80 top-8 z-40 bg-slate-300'></div>}
        </div>
    )
}

export default TopNav;