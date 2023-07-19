import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "../redux/counterSlice";
import { setAuthorization} from "../redux/currentuserSlice";

function Dashboard() {
    const counter = useSelector((state) => state.counter)
    const currentuser = useSelector((state) => state.currentuser)
    const dispatch = useDispatch()

    const increaseCount = () => {
        dispatch(increment())
    }
    const decreaseCount = () => {
        dispatch(decrement())
    }
    const dispatchSetAuthorization = (auth) => {
        dispatch(setAuthorization(auth))
    }

    const navigate = useNavigate()
    const handleClick = async () => {
    // Perform the request when the button is clicked
    const resp = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST', // Specify the request method as POST
        headers: {
        'Content-Type': 'application/json' // Set the Content-Type header to indicate JSON data
        },
        body: JSON.stringify(
        // {name: 'sample2'}
        {user: { 
        email: 'test@test.com',
        password: '123123',
        }}
        ) // Replace with the desired request body
    })
    let userData = await resp.json()
    dispatchSetAuthorization(userData.headers.Authorization)
    console.log(userData);
    };

    const handleLogout = () => {
    // Perform the request when the button is clicked
    fetch('http://127.0.0.1:3000/logout', {
        method: 'DELETE', // Specify the request method as POST
        headers: {
        'Content-Type': 'application/json',
        'Authorization': currentuser.authorization
        },
        // body: JSON.stringify({user: { 
        //   // body:'byebug'
        //   email: 'test54@test.com',
        //   password: '123123',
        //   // password_confirmation: '123123'
        // }}) // Replace with the desired request body
    })
        .then(response => {
        // Handle the response as needed
        console.log(response);
        dispatchSetAuthorization('')
        })
        .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
        });
    };

    const handleGoToHome = () => {
        navigate('/home')
    }


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={handleClick}>Login</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleGoToHome}>Home</button>
                <div>
                    <p>Count: {counter.count}</p>
                </div>
                <button onClick={increaseCount}>Increase</button>
                <button onClick={decreaseCount}>Decrease</button>
            </header>
        </div>
    );
}

export default Dashboard;