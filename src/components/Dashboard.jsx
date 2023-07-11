import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    const handleClick = () => {
    // Perform the request when the button is clicked
    fetch('http://127.0.0.1:3000/login', {
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
        .then(response => {
        // Handle the response as needed
        console.log(response);
        })
        .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
        });
    };

    const handleLogout = () => {
    // Perform the request when the button is clicked
    fetch('http://127.0.0.1:3000/logout', {
        method: 'DELETE', // Specify the request method as POST
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0M2U2NWQzOC1jMGU1LTQzYmEtOWY2Zi0zZGU1NThjOTEwODUiLCJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjg4OTYxNTE5LCJleHAiOjE2ODg5NjMzMTl9.Q1PAeYui7m4Sq1N-1pWjZh11bpppLgnID4rxZP4p_uE'
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
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={handleClick}>Click me</button>
            <button onClick={handleLogout}>logout</button>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            <button onClick={handleGoToHome}>Home</button>
            </header>
        </div>
    );
}

export default Dashboard;