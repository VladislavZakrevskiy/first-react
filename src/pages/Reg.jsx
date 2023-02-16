import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../API/PostService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import MyModal from '../components/UI/Modal/MyModal'
import { AuthContext } from '../context'
import findErrors from '../utils/findErrors'
import classes from './css/Reg.module.css'

const Reg = () => {
    const [modal, setModalErr] = useState(false)
    const [reg, setReg] = useState({username:'', password:'', address:'', date_birth:'', telephone:'', email:''})
    const [error, setErr] = useState()

    const submit = async event => {
      const err = await findErrors(event, PostService.registration, reg, [400,401,403])
      if(err[0]){
        setErr(err)
      }
      setModalErr(true) 
      console.log(error[0].errors.errors[0].msg)
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
      
    }
  return (
    <div>
        <div className={classes.main}>
        <h1 className={classes.title}>Зарегистрируйте учетную запись</h1>
        <form 
            className={classes.form}
            onSubmit={submit}
        >
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
        </form>
        
        <MyButton onClick={submit} type='submit'>Зарегистрироваться</MyButton>
        <Link  to='/login'>
          <MyButton>Войти в аккаунт</MyButton>
        </Link>
    </div>
        
    <MyModal
      visible={modal} 
      setVisible={setModalErr}
      key='r3g4bedb443bb4brbf'
    >
       {
        typeof error[0] == 'object' && error && modal
        ? <div className={classes.error}>
              <div className={classes.err_title}>{}</div>
            
          </div>
        : <div className={classes.error}>
            <div className={classes.err_title}>{}</div>
          </div>
        
      } 
    </MyModal>

    </div>
  )
}

export default Reg