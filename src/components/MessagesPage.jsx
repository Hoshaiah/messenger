import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView, loadMessages} from "../redux/messagesSlice";
import InputMessage from "./InputMessage";
import { retrieveMessages } from "../services/actionServices";



function MessagesPage () {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const currentuserState = useSelector((state) => state.currentuser)

    useEffect( () => {
        const fetchMessages = async () => {
            const messagesData = await retrieveMessages(currentuserState.authorization, 'User', 1)
            dispatch(loadMessages({
                id: 'Mark',
                messages: messagesData.data
            }))
        }
        fetchMessages()
    },[])

    return (
        <div class = "fixed top-10 left-80 p-0 w-[calc(100vw-320px)] h-[calc(100vh-120px)] flex flex-col justify-between">
           <div class='h-10 w-full bg-slate-800 text-white border border-slate-600'>
                <h1 class='m-2'>Hosh Domingo</h1> 
            </div> 
            <div class='flex flex-1 flex-col overflow-y-scroll pb-2 bg-slate-200'>
                {messagesState.messageGroup[messagesState.currentMessageView] && messagesState.messageGroup[messagesState.currentMessageView].map((message) => (
                    <div class="flex w-full">
                        {message.sender_id === currentuserState.userInfo.id ?
                            <div class='bg-blue-500 text-white m-1 p-1.5 rounded-md max-w-md w-fit ml-auto'>{message.body}</div>
                            :
                            <div class='bg-slate-800 text-white m-1 p-1.5 rounded-md max-w-md w-fit'>{message.body}</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessagesPage;