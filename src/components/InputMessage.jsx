import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView } from "../redux/messagesSlice";
import { sendMessage } from "../services/actionServices";

function InputMessage() {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const currentuser = useSelector((state) => state.currentuser)
    const inputMessage = useRef(null)

    const handleKeyDown = (e) => {
        const handleSendMessage = async () => {
            const resp = await sendMessage(currentuser.authorization, 'User', messagesState.currentMessageView , inputMessage.current.value)
        }

        if (e.key === "Enter" && inputMessage.current.value.length > 0) {
            handleSendMessage()
            dispatch(updateMessage({
                id: messagesState.currentMessageView,
                message: {
                    body: inputMessage.current.value,
                    sender_id: currentuser.userInfo.id,
                    recipient_id: messagesState.currentMessageView
                }
            })) 
            inputMessage.current.value = ''
        }
    }

    return(
        <div class='fixed left-80 bottom-0 h-20 w-[calc(100vw-20rem)] z-10 flex items-center p-2 bg-slate-800 border border-slate-600'>
            <input 
                onKeyDown={(e) => handleKeyDown(e)} 
                ref={inputMessage}
                class="no-scrollbar h-full w-full p-2 bg-slate-800 text-white focus:outline-none"
                >
            </input>
        </div>
    )
}

export default InputMessage;