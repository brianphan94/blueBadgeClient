import './App.scss';

import {useState, useEffect} from 'react'

import Auth from '../landing/auth/'
import Header from '../../components/header'
import Sidebar from '../../components/home-page-sidebar'

function App() {
  const [token, setSessionToken] = useState('')
  const [userTitle, setUserTitle] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token','Username')){
      setSessionToken(localStorage.getItem('token'))
      setUserTitle(localStorage.getItem('Username'))  
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("Username", userTitle)
  },[userTitle])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    
  }
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('')
  }

  const protectedViews = () => {
    return(token === localStorage.getItem('token') ? <Sidebar token={token} userTitle={userTitle} clickLogout={clearToken}/>: <Auth setUserTitle={setUserTitle} updateToken={updateToken} />)
  }

  return (
    <div className="App">
      <Header />
      {protectedViews()}
      
  
    </div>
  );
}

export default App;
