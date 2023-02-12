import React, { useContext, useEffect, useState } from 'react'
import MyDropZone from './Dropzone';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import MyModal from './UI/Modal/MyModal';
import ImgAvatar from './UI/avatar/imgAvatar'
import classes from './form.module.css'
import { AuthContext } from '../context';
import ImgForForm from './UI/avatar/ImgForForm';

 const PostForm = ({create}) => {
    const {post_id} = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const [post, setPost] = useState({title:'', body: ''})
    const [isImage, setIsImage] = useState(false)


    const addNewPost = (e) => {
      e.preventDefault()
      const newPost ={
        ...post, id: Date.now()
    }
      create(newPost)
      setPost({title:'', body: ''})
    }

  return (
    
        <form className={classes.form}>
          <div className={classes.up_part}>
            <MyInput
              onChange = {e=>setPost({...post, title: e.target.value})}
              value = {post.title} 
              type="text" 
              placeholder='Название поста'/>
            <MyInput
              onChange = {e=> setPost({...post, body: e.target.value})} 
              value = {post.body} 
              type="text" 
              placeholder='Описание'
            /> 
            <MyButton 
              onClick={addNewPost} type=''>
                Создать пост
            </MyButton>
            <MyButton 
              onClick={e=>{e.preventDefault();setModal(true)}}>
                Добавить фото
            </MyButton>
          </div>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <MyDropZone isPost={true} setIsImage={setIsImage} setModal={setModal}/>
        
      </MyModal>   
      {
          isImage
          ? <ImgForForm className={classes.img}/>
          : false
      }
        </form>
    
  )
}

export default PostForm
