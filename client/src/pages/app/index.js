import './App.scss';

//import { Switch, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'

import Auth from '../landing/auth/'

function App() {
  const [token, setSessionToken] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    
  }

  return (
    <div className="App">
      
      <Auth updateToken={updateToken}/>
      
    </div>
  );
}

export default App;
