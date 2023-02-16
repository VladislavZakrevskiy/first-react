import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import MyModal from '../components/UI/Modal/MyModal'
import { AuthContext } from '../context'
import findErrors from '../utils/findErrors'
import classes from './css/Login.module.css'

const Login = () => {
    const [modal, setModal] = useState(false)
    const {isAuth, setIsAuth,isLoading, username, setUsername} = useContext(AuthContext)
    let [user, setUser] = useState({username:'', password:''})
    let [error, setErr] = useState('')
    const submit = async event => {
        event.preventDefault()
        let [error,token,username] = await findErrors(event, PostService.login, user, [400,401,403])
        setErr(error)
        if(username){
            localStorage.setItem('username', username)
        }
        if(token){
            localStorage.setItem('auth',token)
        }
        setModal(true)
    }
    
  return (
      <div>
        <form 
            className={classes.form}
            onSubmit={submit}
        >
             <h1 className={classes.title}>Войдите в учетную запись</h1>
            <MyInput value={user.username} onChange={e => setUser({...user, username:e.target.value})} type='text' placeholder='Введите логин' />
            <MyInput value={user.password} onChange={e => setUser({...user, password:e.target.value})} type='password' placeholder='Введите пароль' />
            <MyButton>Войти</MyButton>
            <Link style={{textDecoration:'none'}} to='/registration'>
                <MyButton >
                    Регистрация
                </MyButton>
            </Link>
        </form>
        
        
        <MyModal
            visible={modal}
            setVisible={setModal}
        >
            {
                typeof error == 'number'
                ? setIsAuth(true)
                : <div className={classes.error}>
                <div className={classes.err_title}>
                    {error}
                </div>
            </div>
            }
        </MyModal>
      </div> 
        

  )
}

export default Login