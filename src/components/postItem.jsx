import React, { useContext, useEffect, useState } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import '../styles/App.css'
import ImgAvatar from './UI/avatar/imgAvatar'
import MyButton from './UI/button/MyButton'
import MyModal from './UI/Modal/MyModal'
import classes from './css/form.module.css'
import MyInput from '../components/UI/input/MyInput'
import ImgForPost from '../components/UI/avatar/imgForPost'
import PostService from '../API/PostService'
import { AuthContext } from '../context'
import styles from './css/postItem.module.css'


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

  function getMonth(number){
    switch (number) {
      case '01':
        return 'Янв'
        break;
      case '02':
        return 'Февр'
        break;
      case '03':
        return 'Март'
        break;
      case '04':
        return 'Апр'
        break;
      case '05':
        return 'Май'
        break;
      case '06':
        return 'Июнь'
        break;
      case '07':
        return 'Июль'
        break;
      case '08':
        return 'Авг'
        break;
      case '09':
        return 'Сент'
        break;
      case '10':
        return 'Окт'
        break;
      case '11':
        return 'Нояб'
        break;
      case '12':
        return 'Дек'
        break;
    }
  }

  return (
    <div  className={styles.post}>
    <div className='post'>
       
    <div  className={styles.post}>
                  <div className={styles.date_cont}>
                    <p className={styles.date_num}>{ props.post.date_made.split('T20:00:00.000Z')[0].split('-')[2]}</p>
                    <p className={styles.date_month}>{getMonth(props.post.date_made.split('T20:00:00.000Z')[0].split('-')[1])}</p>
                    <p className={styles.date_year}>{ props.post.date_made.split('T20:00:00.000Z')[0].split('-')[0]}</p>
                  </div>
                 
                  <div className={styles.titleBody}>
                    <p className={styles.title}>{props.post.title}</p>
                    <p className={styles.body}>{props.post.body}</p>
                  </div>
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
              <div >
                <div  className={styles.post}>
                  <div className={styles.date_cont}>
                    <p className={styles.date_num}>{ props.post.date_made.split('T20:00:00.000Z')[0].split('-')[2]}</p>
                    <p className={styles.date_month}>{getMonth(props.post.date_made.split('T20:00:00.000Z')[0].split('-')[1])}</p>
                    <p className={styles.date_year}>{ props.post.date_made.split('T20:00:00.000Z')[0].split('-')[0]}</p>
                  </div>
                 
                  <div className={styles.titleBody}>
                    <p className={styles.title}>{props.post.title}</p>
                    <p className={styles.body}>{props.post.body}</p>
                  </div>
                </div>
                <div >
                  <MyButton onClick={()=> props.remove(props.post)}>Подтвердить</MyButton>
                  <MyButton onClick={()=> setModal(false)}>Отменить</MyButton>
                </div>
              </div>
          </MyModal>
          
      </div>
      
     </div>
  )
}

export default PostItem


