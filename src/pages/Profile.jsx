import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton'
import classes from './Profile.module.css'
import MyDropzone from '../components/Dropzone'
import PostService from '../API/PostService'
import MyModal from '../components/UI/Modal/MyModal'
import { AuthContext } from '../context'
import ImgAvatar from '../components/UI/avatar/imgAvatar'


const Profile = ({...props}) => {
    const {username} = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const [modalDrop, setModalDrop] = useState(false)
    
    useEffect(()=>{
        async function getInfo(){
            const profile = await PostService.getProfile(username)
            setInfo(await profile.data)
        }
        getInfo()
    },[])
    const {usernameContext} = useContext(AuthContext)
    const [info, setInfo] = useState({user_name:'', address:'', date_birth: '', telephone:'', email:''})


  return (
    <div style={{textAlign:'center', marginTop: 30}}>
    <div className={classes.main}>
        <div className={classes.right}>
            <h1 style={{fontFamily:"monospace", fontSize: 30}}>Профиль</h1>
            <ImgAvatar className={classes.ava}/>
            <p className={classes.username}>{info.user_name}</p>
            <MyButton onClick={()=> setModal(true)}>Загрузить фото профиля</MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <MyDropzone  setModal={setModalDrop}/>
            </MyModal>
        </div>
       <div className={classes.left}>
            <h1 style={{fontFamily:"monospace", fontSize: 30}}>Доп. Информация</h1>
            <p className={classes.info}>Адрес: {info.address}</p>
            <p className={classes.info}>Телефон: {info.telephone}</p>
            <p className={classes.info}>Дата Рождения: {info.date_birth.split('T20:00:00.000Z')}</p>
            <p className={classes.info}>Онлайн: {info.online}</p>
            <p className={classes.info}>Email: {info.email}</p>
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







{/* <form method="post" encType="multipart/form-data">
                <label className={classes.input_file}>
                    <input onChange={getImage}  type="file" name="file"/>		
                    <span>Выберите файл</span>
                    <MyButton onClick={sendImg}>Поменять</MyButton>
                </label>
            </form> */}