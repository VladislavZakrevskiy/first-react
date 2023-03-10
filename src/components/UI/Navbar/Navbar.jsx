import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context'
import Avatar from '../avatar/Avatar'
import MyButton from '../button/MyButton'
import AvatarPhoto from '../../../assets/photo.jpg'

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  
  const logOut =() => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  const unvisibleBth = event => {
    if(isAuth){
      event.target.style.visibility = 'visible'
    }
    
  }
  
  return (
    <div>
      {
        isAuth ?
        <div  className='navbar'>
        <div style={{display:'flex'}}>
        <MyButton onClick ={logOut}>
              Выйти
            </MyButton>
            <Avatar src={AvatarPhoto}/>
        </div>
         <div  className='navbar_links'>
         <Link className='navbar_links_items' to='/about'>О сайте</Link>
         <Link className='navbar_links_items' to='/posts'>Посты</Link>
       </div>
       </div>
        :
        false
      }
    </div>
      
  )
}

export default Navbar