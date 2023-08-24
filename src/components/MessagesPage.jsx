import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView } from "../redux/messagesSlice";
import InputMessage from "./InputMessage";



function MessagesPage () {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    dispatch(updateCurrentMessageView('Mark'))

    return (
        <div class = "fixed top-10 left-80 p-0 w-[calc(100vw-320px)] h-[calc(100vh-120px)] flex flex-col justify-between bg-slate-200">
           <div class='h-10 w-full'>
                <h1>Hosh Domingo</h1> 
            </div> 
            <div class='flex flex-1 flex-col overflow-y-scroll pb-2'>
                {messagesState.messageGroup[messagesState.currentMessageView] && messagesState.messageGroup[messagesState.currentMessageView].map((message) => (
                    <div class='bg-blue-500 text-white m-1 p-1.5 rounded-md max-w-md w-fit'>{message}</div>
                ))}
            </div>
        </div>
    )
}

export default MessagesPage;