import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import findErrors from '../utils/findErrors'
import classes from './Reg.module.css'

const UpdateProfile = () => {
    const [info, setInfo] = useState({username:'', address:'', date_birth:'', telephone:'', email:''})
    const formSome = (e, type) => {
        switch (type) {
          case 'username':
              setInfo({...info, username: e.target.value})
            break;
          case 'address':
              setInfo({...info, address: e.target.value})
            break;
          case 'date_birth':
              setInfo({...info, date_birth: e.target.value})  
            break;
          case 'telephone':
              setInfo({...info, telephone: e.target.value})
            break;
          case 'email':
              setInfo({...info, email: e.target.value})
            break;
        }
        
      }
      const submit = e => {
        e.preventDefault()
        PostService.updateUser(info.username, info.address, info.telephone, info.email).then(()=>localStorage.setItem('username', info.username))
    }


  return (
    <div>
        <div className={classes.main}>
            <h1 className={classes.title}>Изменение учетной записи</h1>
            <form 
                className={classes.form}
                onSubmit={submit}
            >
            <div className={classes.nigger}>
                <div className={classes.bracket}>
                <MyInput value = {info.username} onChange={e=>formSome(e, 'username')} type='text' placeholder='Введите логин'/>
                </div>
                <div className={classes.bracket}>
                <MyInput value = {info.address} onChange={e=>formSome(e, 'address')}  type='text' placeholder='Введите адрес'/>
                <MyInput value = {info.date_birth} onChange={e=>formSome(e, 'date_birth')}  type='date' placeholder='Введите дату рождения'/>
                <MyInput value = {info.telephone} onChange={e=>formSome(e, 'telephone')}  type='tel' placeholder='Введите номер телефона'/>
                <MyInput value = {info.email} onChange={e=>formSome(e, 'email')}  type='email' placeholder='Введите почту'/>
                </div>
            </div>
            
            </form>
            <MyButton onClick={submit} type='submit'>Изменить</MyButton>
            <Link style={{textAlign:'center', }} to='/profile'>
            <MyButton>Вернуться в профиль</MyButton>
            </Link>
        </div>
    </div>
  )
}

export default UpdateProfile