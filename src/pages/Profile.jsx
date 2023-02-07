import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton'
import classes from './Profile.module.css'

const Profile = ({...props}) => {
  return (
    <div style={{textAlign:'center', marginTop: 30}}>
    <div className={classes.main}>
        <div className={classes.right}>
            <h1 style={{fontFamily:"monospace", fontSize: 30}}>Профиль</h1>
            <img 
                src={props.src} 
                alt='Фото Профиля' 
                className={classes.ava} 
            />
            <p className={classes.username}>{props.value.username}</p>
        </div>
       <div className={classes.left}>
            <h1 style={{fontFamily:"monospace", fontSize: 30}}>Доп. Информация</h1>
            <p className={classes.info}>Адрес: {props.info.address}</p>
            <p className={classes.info}>Телефон: {props.info.telephone}</p>
            <p className={classes.info}>Дата Рождения: {props.info.date}</p>
            <p className={classes.info}>Онлайн: {props.info.online}</p>
            <p className={classes.info}>Email: {props.info.email}</p>
       </div>
    </div>
    {
        props.inModal ?
            <Link to='/profile' onClick={props.callbackForBtn}>
                <MyButton className={classes.btn}>
                    Открыть профиль
                </MyButton>
            </Link>
        : false
    }
    
    </div>
  )
}

export default Profile