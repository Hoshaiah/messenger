import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import consumer from '../cable';
import { useEffect, useRef, useState } from 'react';


function Home() {
    const navigate = useNavigate()    
    function handleClick() {
        navigate('/');
    }
    const cableRef = useRef(null)
    const broadcastMessage = useRef()
    const [currentMessages, setCurrentMessages] = useState([])

    useEffect(() => {
        const channel = consumer.subscriptions.create({
            channel: 'MessageChannel',
            stream: 'private_chat_2',
            username: '2',
          }, {
            connected: () => {
                console.log('connected')
                cableRef.current = channel
            },
            disconnected: () => console.log('disconnected'),
            received: (data) => {
                handleNewMessage(data)
            },
          })
        cableRef.current = channel
        // channel.send({ message: 'Hello from React app' });
        return () => {
            // consumer.disconnect()
            // consumer.subscriptions.remove(channel)
            channel.unsubscribe()
        }
    }, [])
    const handleSubmit = () => {
        cableRef.current.send({ user: 2, message: broadcastMessage.current.value })
    }

    const handleNewMessage = (newMessage) => {
        setCurrentMessages((prevMessages) => {
            return [...prevMessages, newMessage]
        })
    }
    return (
        <div>
            <button onClick={handleClick}>Back to Dashboard</button> 
            <input type="text" ref={broadcastMessage}/>
            <button onClick={handleSubmit}>test broadcast</button>
            <div>{currentMessages.map((message) => (
                <p>{message}</p>
            ))}
            </div>
        </div>
    );
}

export default Home;