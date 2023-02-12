import axios from 'axios';
import React,{useContext, useState} from 'react';
import classes from './Dropzone.module.css'
import { AuthContext } from '../context/index'


const  MyDropZone =({setModal})=>{
  const {username} = useContext(AuthContext)
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
    setTimeout(()=>{setModal(false); setDrag(false)}, 500)
    let files = [...e.dataTransfer.files]
    const formData = new FormData()
    formData.append('image', files[0])
    formData.append('username', username)
    axios.post('http://localhost:5000/api/images/702b3564-30c7-4624-97ae-8097c0673517', formData)
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