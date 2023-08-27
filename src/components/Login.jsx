import { useDispatch, useSelector } from 'react-redux';
import { setAuthorization, setCurrentUserInfo} from "../redux/currentuserSlice";
import Constants from '../constants';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import Cookies from 'js-cookie';

function Login () {
    const counter = useSelector((state) => state.counter)
    const currentuser = useSelector((state) => state.currentuser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginEmail = useRef()
    const loginPassword = useRef()
    const signupEmail = useRef()
    const signupPassword= useRef()

    const dispatchSetAuthorization = (auth) => {
        dispatch(setAuthorization(auth))
    }

    const handleLoginSubmit = async () => {
    // Perform the request when the button is clicked
    const resp = await fetch(`${Constants.server}login`, {
        method: 'POST', // Specify the request method as POST
        headers: {
        'Content-Type': 'application/json' // Set the Content-Type header to indicate JSON data
        },
        body: JSON.stringify(
        // {name: 'sample2'}
        { 
            user: { 
                email: loginEmail.current.value,
                password: loginPassword.current.value,
            }
        })})
        let userData = await resp.json()
        const authorization = userData.headers.Authorization
        Cookies.set('jwt_token', authorization)
        localStorage.userInfo = JSON.stringify(userData.data.user)
        dispatchSetAuthorization(authorization)
        dispatch(setCurrentUserInfo(userData.data.user)) 
        
        if(userData.status.code === 200) {
            navigate('/')
        }
    };

    const handleSignupSubmit = async () => {
        const resp = await fetch(`${Constants.server}signup`, {
            method: 'POST', // Specify the request method as POST
            headers: {
            'Content-Type': 'application/json' // Set the Content-Type header to indicate JSON data
            },
            body: JSON.stringify(
            // {name: 'sample2'}
            {
                user: { 
                    email: signupEmail.current.value,
                    password: signupPassword.current.value,
                }
            })})
            let userData = await resp.json()
            
            if(userData.status.code === 200) {
                navigate('/')
            }
    }
    return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <div >
                <input
                    className="block w-full mb-2 p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    ref={loginEmail}     
                />
                <input
                    className="block w-full mb-2 p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    ref={loginPassword} 
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleLoginSubmit}>
                    Login
                </button>
              </div>
        
              <h2 className="text-2xl font-bold mt-6 mb-4">Sign Up</h2>
                <div>
                    <input
                        className="block w-full mb-2 p-2 border rounded"
                        type="email"
                        placeholder="Email"
                        ref={signupEmail}
                    />
                    <input
                        className="block w-full mb-2 p-2 border rounded"
                        type="password"
                        placeholder="Password"
                        ref={signupPassword}
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={handleSignupSubmit}>
                        Sign Up
                    </button>
                </div>
            </div>
    )
}


export default Login;