import { React, useEffect, useState } from 'react';
import './styles/App.css';
import {BrowserRouter} from 'react-router-dom'

import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [post_id, setPost_id] = useState('')

  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])
    return (
      <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
      username,
      setUsername,
      post_id,
      setPost_id
      }}>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
      )
    
}

export default App;
