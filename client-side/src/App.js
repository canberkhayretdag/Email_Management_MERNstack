import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios'
import './App.css';
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Content from './components/content/Content'
import AuthSection from './components/auth-section/Auth'
axios.defaults.withCredentials = true;



function App() {

  const SERVER_URL = 'http://localhost:3030'



  const [loggedIn, SetLoggedIn] = useState(1);

  if (loggedIn) {
    return (
      <div className="App">
        <Header />
        <Sidebar />
        <Content />
      </div>
    );    
  }
  else {
    return (
      <div className="App">
        <AuthSection />
      </div>
    );    
  }

}

export default App;
