import { useDispatch, useSelector } from 'react-redux';
import { setAuthorization, setCurrentUserInfo} from "../redux/currentuserSlice";
import Constants from '../constants';
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import Cookies from 'js-cookie';
import { loginUser, signupUser } from '../services/actionServices';

function Login () {
    const counter = useSelector((state) => state.counter)
    const currentuser = useSelector((state) => state.currentuser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginEmail = useRef()
    const loginPassword = useRef()
    const signupEmail = useRef()
    const signupPassword= useRef()
    const signupName= useRef()

    const dispatchSetAuthorization = (auth) => {
        dispatch(setAuthorization(auth))
    }

    const handleLoginSubmit = async (email , password) => {
            const userData = await loginUser(email, password)
            const authorization = userData.headers.Authorization
            Cookies.set('jwt_token', authorization)
            Cookies.set('user_id', userData.data.user.id)
            localStorage.userInfo = JSON.stringify(userData.data.user)
            dispatchSetAuthorization(authorization)
            dispatch(setCurrentUserInfo(userData.data.user)) 
            
            if(userData.status.code === 200) {
                navigate('/')
            }
    };

    const handleSignupSubmit = async () => {
        const userData = await signupUser(signupName.current.value, signupEmail.current.value, signupPassword.current.value)
        if(userData.status.code === 200) {
            handleLoginSubmit(signupEmail.current.value, signupPassword.current.value)
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => {handleLoginSubmit(loginEmail.current.value, loginPassword.current.value)}}>
                    Login
                </button>
              </div>
        
              <h2 className="text-2xl font-bold mt-6 mb-4">Sign Up</h2>
                <div>
                    <input
                        className="block w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder="Name"
                        ref={signupName} 
                    />
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