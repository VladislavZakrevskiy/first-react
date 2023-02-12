import axios from 'axios';
import React,{useContext, useState} from 'react';
import classes from './Dropzone.module.css'
import { AuthContext } from '../context/index'
import { v4 } from 'uuid'
 

const  MyDropZone =({setModal, isPost, setIsImage})=>{
  const {username, post_id, setPost_id} = useContext(AuthContext)
  const [drag, setDrag] = useState(false)

  function dragStartHandler(e){
    e.preventDefault()
    setDrag(true)
  }

  function dragLeaveHandler(e){
    e.preventDefault()
    setDrag(false)
    setModal(false)
  }
    function onDropHandler(e){
    e.preventDefault()
    console.log(post_id)
    setTimeout(()=>{setModal(false); setDrag(false); }, 500)
    let files = [...e.dataTransfer.files]
    const formData = new FormData()
    formData.append('image', files[0])
    if(isPost){
      localStorage.setItem('post_id', v4())
      formData.append('post_id', localStorage.getItem('post_id'))
    }
    else {
       formData.append('username', username)
      }
    axios.post('http://localhost:5000/api/images/', formData)
      .then(()=>{
        setIsImage(true)
    })
  }

    return(
      <div>
        {
          drag 
          ? <div 
          className={classes.drop_area}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop={e => onDropHandler(e)}
          >
            Отпутите файл
          </div>
          : <div
            className={classes.drop}
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
          >
            Перетащите файл
          </div>
        }
      </div>
          );
}

export default MyDropZone