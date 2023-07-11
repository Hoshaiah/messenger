import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    function handleClick() {
        navigate('/');
    }

    return (
        <button onClick={handleClick}>Back to Dashboard</button> 
    );
}

export default Home;