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
import { useSelector } from 'react-redux';

function App() {
  const currentuser = useSelector((state) => state.currentuser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if(currentuser.authorization) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [currentuser])
  console.log(isAuthenticated)
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Main/>} /> */}
        <Route exact path="/home" element={<Home/>} />
        <Route
          path="/"
          element={isAuthenticated ? <Main/> : <Navigate to="/login"/>}
        />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
