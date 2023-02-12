import React, { useContext, useEffect, useState } from 'react'
import Profile from '../../../pages/Profile'
import MyModal from '../Modal/MyModal'
import classes from './Avatar.module.css'
import AvatarPhoto from '../../../assets/photo.jpg'
import PostService from '../../../API/PostService'
import { AuthContext } from '../../../context'
import ImgAvatar from './imgAvatar'

const Avatar = ({src}) => {
    const [modal, setModal] = useState(false)


    let MemoProfile = React.memo(Profile)

  return (
    <div>
        <MyModal
            visible={modal} 
            setVisible={setModal}
        >
            <MemoProfile
                inModal ={true}
                callbackForBtn = {()=>setModal(false)}
            />
        </MyModal>
        <ImgAvatar onClick={()=>setModal(true)} className={classes.ava}/>
    </div>
  )
}

export default Avatar