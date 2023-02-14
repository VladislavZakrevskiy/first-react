import React, { useContext, useEffect, useState } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import '../styles/App.css'
import ImgAvatar from './UI/avatar/imgAvatar'
import MyButton from './UI/button/MyButton'
import MyModal from './UI/Modal/MyModal'
import classes from './form.module.css'
import MyInput from '../components/UI/input/MyInput'
import ImgForPost from '../components/UI/avatar/imgForPost'
import PostService from '../API/PostService'
import { AuthContext } from '../context'
import styles from './postItem.module.css'


const PostItem=(props) =>{
  const router = useNavigate()

  const [updModal, setUpdModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [btnModal, setBtnModal] = useState(false)
  const [info,setInfo] = useState({title:'', body:''})
  const [likes, setLikes] = useState()
  const [isLiked, setIsLiked] = useState(false)

  const deleteImg = (e,post_id) => {
    e.preventDefault()

  }
  useEffect(()=>{
    props.post.array_length === null
    ?
    setLikes(0)
    : 
    setLikes(props.post.array_length)
  }, [])
  

  const updatePost = (e,post_id) => {
    e.preventDefault()
    PostService.updatePost(info.title, info.body, post_id).catch(e=>console.log(e))
    setUpdModal(false)
   
  }
  const increment = () => {
    setLikes(likes+1)
    setIsLiked(true)
    PostService.setLike(props.post.post_id, localStorage.getItem('username'))
  }
  const dicrement = () => {
    setLikes(likes-1)
    setIsLiked(false)
    PostService.deleteLike(props.post.post_id, localStorage.getItem('username'))
  }

  const likeSetting = () => {
    if(isLiked){
      dicrement()
      console.log(isLiked, likes)
    }
    else increment()
  }

  return (
    <div style={{backgroundColor:'white',border: 'solid 2px teal', borderRadius: 20, padding: 10, margin: '20px 0 '}} >
    <div className='post'>
       <strong style={{padding:10,  borderBottom:'2px solid teal', borderRadius: 10}}>{props.number}. {props.post.title}</strong>
       <div style={{fontSize:20, padding: 20}}>
         {props.post.body}
       </div>
       <MyButton onClick={()=>setBtnModal(true)}>...</MyButton>
          <MyModal
            visible={btnModal}
            setVisible={setBtnModal}
          >
              <MyButton onClick ={()=>router(`/posts/${props.post.post_id}`)}>
                Открыть
              </MyButton>
              <MyButton onClick={()=>setUpdModal(true)}>Изменить</MyButton>
              <MyButton onClick ={()=>setModal(true) }  className='post_btns'>
                Удалить
              </MyButton>
          </MyModal>
          <MyModal
            visible={updModal}
            setVisible={setUpdModal}
          >
            
            <form className={classes.formForPostItem}>
              <h1>Изменить пост</h1>
              <div>
                <MyInput value={info.title} onChange={e=>setInfo({...info, title: e.target.value})} placeholder="Новое название поста"/>
                <MyInput value={info.body} onChange={e=>setInfo({...info, body: e.target.value})} placeholder="Новое описание поста"/>
              </div>
              
              <MyButton onClick={e=>updatePost(e,props.post.post_id)}>Изменить</MyButton>
            </form>
          </MyModal>
          <MyModal
            visible={modal}
            setVisible={setModal}
          >
              <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:15,padding: 15}}>
                <div style={{padding: 30, fontSize: 18, border: '3px solid teal', borderRadius:20}} className='post_content'>
                  <strong>{props.number}. {props.post.title}</strong>
                  <div>
                    {props.post.body}
                  </div>
                </div>
                <div style={{display:'flex', justifyContent:"space-around", width:'100%'}}>
                  <MyButton onClick={()=> props.remove(props.post)}>Подтвердить</MyButton>
                  <MyButton onClick={()=> setModal(false)}>Отменить</MyButton>
                </div>
              </div>
          </MyModal>
          
      </div>
      <div className={styles.down}>
      <p className={styles.date}>{ props.post.date_made}</p>
      <button onClick={likeSetting} className={styles.like}>💖</button> 
      <p className={styles.counter}> {likes }</p>
     </div>
     </div>
  )
}

export default PostItem


