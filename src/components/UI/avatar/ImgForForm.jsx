import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import PostService from '../../../API/PostService'
import { AuthContext } from '../../../context'
import classes from '../../../pages/Profile.module.css'
import {Buffer} from 'buffer';
import { useImage } from '../../../hooks/useImage'

const ImgForForm = ({className, onClick}) => {
    const {username} = useContext(AuthContext)
    const url = 'http://localhost:5000/api/images/'


    const screenShot = useImage(localStorage.getItem('post_id'))
  return (
    <div>
        <img onClick={onClick} className={className} src={screenShot}  />
    </div>
  )
}

export default ImgForForm



