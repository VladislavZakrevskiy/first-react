import React, { useState } from 'react'
import Profile from '../../../pages/Profile'
import MyModal from '../Modal/MyModal'
import classes from './Avatar.module.css'
import AvatarPhoto from '../../../assets/photo.jpg'

const Avatar = ({src}) => {
    const [modal, setModal] = useState(false)


  return (
    <div>
        <MyModal
            visible={modal} 
            setVisible={setModal}
        >
            <Profile
                inModal ={true}
                callbackForBtn = {()=>setModal(false)}
                src = {AvatarPhoto}
                value = {{username: "Влад Закревский"}}
                info={{
                    address: 'Знаменск',
                    telephone: '899963062057',
                    date: '16.03.2006',
                    online: 'online',
                    email: 'zakrevskiyvlada@yandex.ru'
                }}
            />
        </MyModal>
        <img onClick={()=>setModal(true)} src={src} alt='Профиль' className={classes.ava} />
    </div>
  )
}

export default Avatar