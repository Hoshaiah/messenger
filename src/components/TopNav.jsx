import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, retrieveFriendrequests, sendFriendrequest } from "../services/actionServices";
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

        if (data.status >= 200 && data.status < 300) {
            setFriendRequests(data.friendrequests)
        }
        setFriendBox(true)
    }

    const handleAcceptFriendrequestClick = async (friend_id) => {
       const data = await sendFriendrequest(currentuser.authorization, currentuser.userInfo.id, friend_id ) 
       
        if (data.status >= 200 && data.status <300) {
            handleFriendrequestClick()
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
            <button ref={friendRequestButton} class= 'absolute right-28 mr-2 text-white' onClick={handleFriendrequestClick} >Friend Requests</button>
            {friendBox && 
                <div ref={friendDiv} class='absolute rounded-sm right-16 w-60 h-80 top-8 z-40 bg-slate-300'>
                    {friendRequests && friendRequests.map((req)=>(
                        <div class="flex p-1 border-b-2 border-slate-200 py-2">
                            <div class="flex justify-center items-center rounded-full bg-slate-200 w-16 h-12 text-slate-800">{req.name[0].toUpperCase()}</div>
                            <div class=" w-full">
                                <p class="ml-4">{req.name}</p>
                                <div class="flex border-">
                                    <button class="ml-2 mr-4 mt-1 p-1 pl-2 pr-2 rounded-sm bg-blue-900 text-white text-sm" onClick={() => handleAcceptFriendrequestClick(req.id)}>Accept</button>
                                    <button class="mt-1 p-1 pl-2 pr-2 rounded-sm bg-slate-400 text-white text-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            <button class= 'absolute right-5 mr-2 text-white' onClick={handleLogoutClick} >Logout</button>
        </div>
    )
}

export default TopNav;