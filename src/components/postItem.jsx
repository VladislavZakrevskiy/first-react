import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/App.css'
import MyButton from './UI/button/MyButton'


const PostItem=(props) =>{
  const router = useNavigate()

  return (
    <div className='post'>
       
        <div className='post_content'>
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
        </div>
        <div style={{display:'flex', gap:2}}>
            <MyButton onClick ={()=>router(`/posts/${props.post.id}`)}>
              Открыть
            </MyButton>
            <MyButton onClick ={()=> props.remove(props.post) }  className='post_btns'>
              Удалить
            </MyButton>
          </div>
      </div>
  )
}

export default PostItem