import React from 'react'
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [classes.MyModal]
  if(visible){
    rootClasses.push(classes.active)
  }

  return (
    <div onClick={()=> setVisible(false)} className={rootClasses.join(' ')}>
        <div className={classes.MyModalContent} onClick={e=>e.stopPropagation()}>
          {children}
        </div>
    </div>
  )
}

export default MyModal