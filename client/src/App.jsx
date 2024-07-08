import React from 'react';
import './App.css';
import Navigation from './pages/Navigation/navigation';
import Leave from './pages/Leave/leave';
import Home from './pages/home/home';
import Login from './pages/login/login';
import {HouseProvider} from './context/houseContext';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
  return (
   <HouseProvider>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/leave" element ={<Leave/>} />
        <Route path="/" element = {<Login/>}/>
        <Route path = "/home" element = {<Home/>} />
      </Routes>
    </Router>
   </HouseProvider>
  )
}

export default App
