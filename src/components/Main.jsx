import { useRef, useEffect} from "react";
import InputMessage from "./InputMessage";
import MessagesPage from "./MessagesPage";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import consumer from '../cable';
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../redux/messagesSlice";

function Main () {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const currentuser = useSelector((state) => state.currentuser)
    const cableRef = useRef(null)

    useEffect(() => {
        console.log(currentuser.userInfo)
        const channel = consumer.subscriptions.create({
            channel: 'MessageChannel',
            stream: `private_chat_${currentuser.userInfo.id}`,
            username: currentuser.userInfo.id
          }, {
            connected: () => {
                console.log('connected')
                cableRef.current = channel
            },
            disconnected: () => console.log('disconnected'),
            received: (data) => {
                console.log(data)
                dispatch(updateMessage({
                    id: data.sender_id,
                    message: {
                        body: data.body,
                        sender_id: data.user_id,
                        recipient_id: data.recipient_id,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        recipient_type: data.recipient_type
                    }
                })) 
            },
          })
        cableRef.current = channel
        return () => {
            channel.unsubscribe()
        }
    }, [messagesState.currentMessageView])

    return (
        <div className="flex flex-col h-screen">
            <TopNav/>
            <SideNav/>
            <MessagesPage
            />
            <InputMessage
            />
        </div>
    ) 
}

export default Main;