import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'
import classes from './Reg.module.css'

const Reg = () => {
    const [reg, setReg] = useState({username:'', password:'', address:'', date_birth:'', telephone:'', email:''})
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const submit = async event => {
      event.preventDefault()
      let set = new Set()
      for(let el in reg){
        if(el!==''){
          set.add(true)
        }
        else set.add(false)
      }
      if(set.size === 1){
        let res = await PostService.registration(reg)
        console.log(await res.data)
      }
    }

    const formSome = (e, type) => {
      switch (type) {
        case 'username':
            setReg({...reg, username: e.target.value})
          break;
        case 'password':
            setReg({...reg, password: e.target.value})
          break;
        case 'address':
            setReg({...reg, address: e.target.value})
          break;
        case 'date_birth':
            setReg({...reg, date_birth: e.target.value})  
          break;
        case 'telephone':
            setReg({...reg, telephone: e.target.value})
          break;
        case 'email':
            setReg({...reg, email: e.target.value})
          break;
      }
      console.log(reg)
    }

  return (
    <div>
        <div className={classes.main}>
        <h1 className={classes.title}>Зарегистрируйте учетную запись</h1>
        <form 
            className={classes.form}
            onSubmit={submit}
        >
          <div className={classes.nigger}>
            <div className={classes.bracket}>
              <MyInput value = {reg.username} onChange={e=>formSome(e, 'username')} type='text' placeholder='Введите логин'/>
              <MyInput value = {reg.password} onChange={e=>formSome(e, 'password')}  type='password' placeholder='Введите пароль'/>
            </div>
            <div className={classes.bracket}>
              <MyInput value = {reg.address} onChange={e=>formSome(e, 'address')}  type='text' placeholder='Введите адрес'/>
              <MyInput value = {reg.date_birth} onChange={e=>formSome(e, 'date_birth')}  type='date' placeholder='Введите дату рождения'/>
              <MyInput value = {reg.telephone} onChange={e=>formSome(e, 'telephone')}  type='tel' placeholder='Введите номер телефона'/>
              <MyInput value = {reg.email} onChange={e=>formSome(e, 'email')}  type='email' placeholder='Введите почту'/>
            </div>
          </div>
          
        </form>
        <MyButton onClick={submit} type='submit'>Зарегистрироваться</MyButton>
        <Link style={{textAlign:'center', }} to='/login'>
          <MyButton>Войти в аккаунт</MyButton>
        </Link>
    </div>
        
       
    </div>
  )
}

export default Reg