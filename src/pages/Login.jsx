import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const submit = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
  return (
    <div style={{border: '3px solid teal', borderRadius: 30, margin: 30, padding:50}}>
        <h1 style={{margin:30, textAlign:'center'}}>Войдите в учетную запись</h1>
        <form 
            style={{display:"flex", gap:10, flexDirection:'column'}}
            onSubmit={submit}
        >
            <MyInput type='text' placeholder='Введите логин' />
            <MyInput type='password' placeholder='Введите пароль' />
            <MyButton>Войти</MyButton>
        </form>
    </div>
  )
}

export default Login