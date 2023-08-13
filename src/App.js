import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import SideNav from './components/SideNav';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthorization } from './redux/currentuserSlice';

function App() {
  const dispatch = useDispatch()
  const currentuser = useSelector((state) => state.currentuser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const jwt_token = Cookies.get('jwt_token')
  dispatch(setAuthorization(jwt_token))

  useEffect(() => {
    if(currentuser.authorization) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [currentuser])
  
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<Home/>} />
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
