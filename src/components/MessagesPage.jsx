import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { loadMessages} from "../redux/messagesSlice";
import { retrieveMessages } from "../services/actionServices";
import { setAuthorization, setCurrentUserInfo } from "../redux/currentuserSlice";
import Cookies from "js-cookie";



function MessagesPage () {
    const dispatch = useDispatch()
    const messagesState = useSelector((state) => state.messages)
    const currentuserState = useSelector((state) => state.currentuser)
    const scrollRef = useRef(null)

    useEffect( () => {
        const fetchMessages = async () => {
            const messagesData = await retrieveMessages(currentuserState.authorization, 'User', 1)
            if (messagesData.status===200) {
                dispatch(loadMessages({
                    id: 'Mark',
                    messages: messagesData.data
                }))
            } else if (messagesData.status===500) {
                dispatch(setAuthorization(''))
                Cookies.remove('jwt_token');
                Cookies.remove('user_id');
                localStorage.userInfo = ''
                dispatch(setCurrentUserInfo({}))
            }
        }
        fetchMessages()
    },[])

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
          });
        }
      }, [messagesState]);
    return (
        <div className= "fixed top-10 left-80 p-0 w-[calc(100vw-320px)] h-[calc(100vh-120px)] flex flex-col justify-between">
           <div className='h-10 w-full bg-slate-800 text-white border border-slate-600'>
                <h1 className='m-2'>{messagesState.currentMessageView}</h1> 
            </div> 
            <div ref={scrollRef} className='flex flex-1 flex-col overflow-y-scroll pb-2 bg-slate-200'>
                {messagesState.messageGroup[messagesState.currentMessageView] && messagesState.messageGroup[messagesState.currentMessageView].map((message) => (
                    <div className="flex w-full">
                        {message.sender_id === currentuserState.userInfo.id ?
                            <div className='bg-blue-500 text-white m-1 p-1.5 rounded-md max-w-md w-fit ml-auto'>{message.body}</div>
                            :
                            <div className='bg-slate-800 text-white m-1 p-1.5 rounded-md max-w-md w-fit'>{message.body}</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MessagesPage;