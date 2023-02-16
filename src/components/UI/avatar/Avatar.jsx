import React, { useContext, useEffect, useState } from 'react'
import Profile from '../../../pages/Profile'
import MyModal from '../Modal/MyModal'
import classes from './css/Avatar.module.css'
import AvatarPhoto from '../../../assets/photo.jpg'
import PostService from '../../../API/PostService'
import { AuthContext } from '../../../context'
import ImgAvatar from './imgAvatar'
import { Link } from 'react-router-dom'

const Avatar = ({src}) => {
  return (
    <Link to='/profile'>
        <ImgAvatar className={classes.ava}/>
    </Link>
  )
}

export default Avatar




{/*
const [modal, setModal] = useState(false)
let MemoProfile = React.memo(Profile)
<MyModal
visible={modal} 
setVisible={setModal}
>
<MemoProfile
inModal ={true}
callbackForBtn = {()=>setModal(false)}
/>
</MyModal> */}