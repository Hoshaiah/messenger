import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, retrieveFriendrequests } from "../services/actionServices";
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
    const [friendRequests, setFriendRequests] = useState([])

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

    const handleFriendrequestClick = async ()=> {
        const data = await retrieveFriendrequests(currentuser.authorization, currentuser.userInfo.id)

        if (data.status === 200) {
            setFriendRequests(data.friendrequests)
        }
        setFriendBox(true)
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
            <button ref={friendRequestButton} class= 'absolute right-28 mr-2 text-white' onClick={handleFriendrequestClick} >Friend Requests</button>
            {friendBox && 
                <div ref={friendDiv} class='absolute rounded-sm right-16 w-60 h-80 top-8 z-40 bg-slate-300'>
                    {friendRequests && friendRequests.map((req)=>(
                        <div>{req.name || req.email}</div>
                    ))}
                </div>}
            <button class= 'absolute right-5 mr-2 text-white' onClick={handleLogoutClick} >Logout</button>
        </div>
    )
}

export default TopNav;