import React from 'react'
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [classes.MyModal]
  if(visible){
    rootClasses.push(classes.active)
  }

  return (
    <div onClick={e=> {e.preventDefault();setVisible(false)}} className={rootClasses.join(' ')}>
        <div className={classes.MyModalContent} onClick={e=>e.stopPropagation()}>
        <button onClick={e=>{e.preventDefault();setVisible(false)}} className={classes.btn}>X</button>
          <div className={classes.innerModal}>
            {children}
          </div>
        </div>
    </div>
  )
}

export default MyModal