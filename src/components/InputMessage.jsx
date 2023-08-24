import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView } from "../redux/messagesSlice";

function InputMessage() {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const inputMessage = useRef(null)
    const handleSendMessage = () => {
        dispatch(updateMessage({
            name: messagesState.currentMessageView,
            message: inputMessage.current.value
        })) 
    }

    return(
        <div class='fixed left-80 bottom-0 h-20 w-[calc(100vw-80px)] z-10'>
            <input ref={inputMessage}></input>
            <button onClick={handleSendMessage}>updateMessage</button>
        </div>
    )
}

export default InputMessage;