import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "../redux/counterSlice";
import { setAuthorization} from "../redux/currentuserSlice";
import { useEffect, useState } from 'react';
import { getUserChannels, retrieveFriends, retrieveMessages} from '../services/actionServices';
import { updateCurrentMessageView, loadMessages} from '../redux/messagesSlice';


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
            dispatch(loadMessages({
                id: id,
                messages: messagesData.data
            }))
        }
        fetchMessages()
        dispatch(updateCurrentMessageView(id))
    }
    return(
        <div class="fixed flex h-[calc(100vh-40px)] top-10 justify-center w-80 bg-slate-800 border-slate-600 border">
            <div class = "flex flex-col w-40">
                {friendsList.map((item) => (
                    <button class="bg-white" onClick={() => handleFriendClick(item.id)}>{item.name}</button>
                ))}
            </div>
        </div>
    )
}

export default SideNav