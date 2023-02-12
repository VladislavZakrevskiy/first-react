import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/App.css'
import ImgAvatar from './UI/avatar/imgAvatar'
import MyButton from './UI/button/MyButton'
import MyModal from './UI/Modal/MyModal'
import classes from './form.module.css'


const PostItem=(props, {keyPost_id}) =>{
  console.log(keyPost_id)
  const router = useNavigate()
  const [modal, setModal] = useState(false)
  return (
    <div style={{backgroundColor:'white',border: 'solid 2px teal', borderRadius: 20, padding: 10, margin: '20px 0 '}} >
    <div className='post'>
       <strong style={{padding:10,  borderBottom:'2px solid teal', borderRadius: 10}}>{props.number}. {props.post.title}</strong>
       <div style={{fontSize:20, padding: 20}}>
         {props.post.body}
       </div>
        <div style={{display:'flex', gap:2}}>
            <MyButton onClick ={()=>router(`/posts/${props.post.post_id}`)}>
              Открыть
            </MyButton>
            <MyButton onClick ={()=>setModal(true) }  className='post_btns'>
              Удалить
            </MyButton>
          </div>
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
      <div style={{color:'grey', fontSize: 10, marginLeft: 5}}>
      { props.post.date_made}
     </div>
      
     </div>
  )
}

export default PostItem


