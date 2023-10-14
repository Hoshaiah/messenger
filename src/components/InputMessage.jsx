import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMessage, updateCurrentMessageView } from "../redux/messagesSlice";
import { sendMessage } from "../services/actionServices";
import consumer from '../cable';

function InputMessage() {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const currentuser = useSelector((state) => state.currentuser)
    const inputMessage = useRef(null)

    // const cableRef = useRef(null)
    // useEffect(() => {
    //     const channel = consumer.subscriptions.create({
    //         channel: 'MessageChannel',
    //         username: currentuser.userInfo.id
    //       }, {
    //         connected: () => {
    //             console.log('connected')
    //             cableRef.current = channel
    //         },
    //         disconnected: () => console.log('disconnected'),
    //         received: (data) => {
    //             // handleNewMessage(data)
    //         },
    //       })
    //     cableRef.current = channel
    //     // channel.send({ message: 'Hello from React app' });
    //     return () => {
    //         // consumer.disconnect()
    //         // consumer.subscriptions.remove(channel)
    //         channel.unsubscribe()
    //     }
    // }, [])

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
            // cableRef.current.send({ message: inputMessage.current.value, recipient_id: messagesState.currentMessageView, recipient_type: 'User' })
            inputMessage.current.value = ''
        }
    }

    return(
        <div className='fixed left-80 bottom-0 h-20 w-[calc(100vw-20rem)] z-10 flex items-center p-2 bg-slate-800 border border-slate-600'>
            <input 
                onKeyDown={(e) => handleKeyDown(e)} 
                ref={inputMessage}
                className="no-scrollbar h-full w-full p-2 bg-slate-800 text-white focus:outline-none"
                >
            </input>
        </div>
    )
}

export default InputMessage;