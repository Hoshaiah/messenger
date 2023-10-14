import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthorization, setCurrentUserInfo } from './redux/currentuserSlice';

function App() {
  const dispatch = useDispatch()
  const currentuser = useSelector((state) => state.currentuser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const jwt_token = Cookies.get('jwt_token')
  const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : ''
  dispatch(setAuthorization(jwt_token))
  
  useEffect(() => {
    if(currentuser.authorization) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [currentuser])

  useEffect(() => {
    dispatch(setCurrentUserInfo(userInfo))
  },[])
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Main/> : <Navigate to="/login"/>}
        />
        <Route
          path="/login" 
          element={isAuthenticated ?  <Navigate to="/" /> : <Login/> } />
      </Routes>
    </Router>
  ); 
}

export default App;
