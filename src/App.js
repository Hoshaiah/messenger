import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/home" element={<Home/>} />
      </Routes>
    </Router>
  ); 
}

export default App;
