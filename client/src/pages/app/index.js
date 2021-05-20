import './App.scss';

//import { Switch, Route } from 'react-router-dom';
import {useState, useEffect} from 'react'

import Auth from '../landing/auth/'
import Header from '../../components/header'
import Home from '../home-page'



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

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('')
  }

  const protectedViews = () => {
    return(token === localStorage.getItem('token') ? <Home token={token} clickLogout={clearToken}/> : <Auth updateToken={updateToken} />)
  }

  

  return (
    <div className="App">
      
      <Header />
      {protectedViews()}
  
    </div>
  );
}

export default App;
