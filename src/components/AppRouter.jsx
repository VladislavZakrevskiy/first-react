import React, { useContext } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import { AuthContext } from '../context'
import Login from '../pages/Login'
import { publicRoutes, privateRoutes } from '../router/routes'
import MyLoader from './UI/loader/MyLoader'

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  if(isLoading) {
    return <MyLoader/>
  }
  return (
    isAuth
    ? 
    <Routes>
    {privateRoutes.map(route => 
      
      <Route 
        element={route.element} 
        path={route.path} 
        exact = {route.exact}
        key={route.path}/>
    )}
    </Routes>
    :
    <Routes>
    {publicRoutes.map(route => 
      <Route 
        element={route.element} 
        path={route.path} 
        exact = {route.exact}
        key={route.path}
        />
    )}
    
    </Routes>
    )
}

export default AppRouter