import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    let [user, setUser] = useState({username:'', password:''})
    const submit = async event => {
        event.preventDefault()
        let res = await PostService.login(user)
        if(res.status === 200){
            setIsAuth(true)
            localStorage.setItem('auth',res.data)
        }
    }
  return (
    <div style={{height:'30vw',border: '3px solid teal', borderRadius: 30, margin: 30, padding:50,  display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
       
        <form 
            style={{display:"flex", gap:10, flexDirection:'column'}}
            onSubmit={submit}
        >
             <h1 style={{margin:10, textAlign:'center'}}>Войдите в учетную запись</h1>
            <MyInput value={user.username} onChange={e => setUser({...user, username:e.target.value})} type='text' placeholder='Введите логин' />
            <MyInput value={user.password} onChange={e => setUser({...user, password:e.target.value})} type='password' placeholder='Введите пароль' />
            <MyButton>Войти</MyButton>
        </form>
        <Link to='/registration'>
            <MyButton >
                Регистрация
            </MyButton>
        </Link>
    </div>
  )
}

export default Login