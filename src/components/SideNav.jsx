import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "../redux/counterSlice";
import { useEffect, useState } from 'react';
import { getUserChannels, retrieveFriends, retrieveMessages} from '../services/actionServices';
import { updateCurrentMessageView, loadMessages} from '../redux/messagesSlice';
import { setAuthorization, setCurrentUserInfo } from "../redux/currentuserSlice";
import Cookies from "js-cookie";


function SideNav () {
    const dispatch = useDispatch()
    const currentuser = useSelector((state)=> state.currentuser)
    const sample = ['Hello', 'bye', 'good']
    const [friendsList, setFriendsList] = useState([])

    useEffect(() => {
        const fetchFriends = async () => {
            const friendData = await retrieveFriends(currentuser.authorization);
            setFriendsList(friendData)
        }
        fetchFriends()
    },[])
    const handleFriendClick = (id) => {
        const fetchMessages = async () => {
            const messagesData = await retrieveMessages(currentuser.authorization, 'User', id)
            if (messagesData.status === 200) {
                dispatch(loadMessages({
                    id: id,
                    messages: messagesData.data
                }))
            } else if (messagesData.status ===500) {
                dispatch(setAuthorization(''))
                Cookies.remove('jwt_token');
                localStorage.userInfo = ''
                dispatch(setCurrentUserInfo({}))
            }
        }
        fetchMessages()
        dispatch(updateCurrentMessageView(id))
    }
    return(
        <div class="fixed flex h-[calc(100vh-40px)] top-10 justify-center w-80 bg-slate-800 border-slate-600 border">
            <div class = "flex flex-col w-40">
                {friendsList.map((item) => (
                    <button class="bg-white m-1" onClick={() => handleFriendClick(item.id)}>{ item.name ? item.name: item.email}</button>
                ))}
            </div>
        </div>
    )
}

export default SideNav