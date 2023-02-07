import React from 'react'
import classes from './MyButton.module.css'
export default function MyButton({style,children, ...props}) {
  return (
    <button style={{style}} {...props} className={classes.form_btn}>
        {children}
    </button>
  )
}
