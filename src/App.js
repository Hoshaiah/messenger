import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import SideNav from './components/SideNav';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
