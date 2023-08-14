import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView } from "../redux/messagesSlice";



function MessagesPage () {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const inputMessage = useRef(null)
    dispatch(updateCurrentMessageView('Mark'))

    const handleSendMessage = () => {
        dispatch(updateMessage({
            name: messagesState.currentMessageView,
            message: inputMessage.current.value
        })) 
    }
    return (
        <div class = "flex flex-col w-full justify-around bg-slate-200">
           <div class='h-10'>
                <h1>Hosh Domingo</h1> 
            </div> 
            <div class='flex flex-1'>
                {messagesState.messageGroup[messagesState.currentMessageView] && messagesState.messageGroup[messagesState.currentMessageView].map((message) => (
                    <p>{message}</p>
                ))}
            </div>
            <div class='h-20'>
                <input ref={inputMessage}></input>
                <button onClick={handleSendMessage}>updateMessage</button>
            </div>
        </div>
    )
}

export default MessagesPage;