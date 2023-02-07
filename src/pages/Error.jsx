import React from 'react'

const Error = () => {
  return (
    <div style={{border:'4px solid black', padding:50, marginTop: 50}}>
        <h1 style={{color:'red', fontWeight:'bolder', fontSize:200}}>
            404
        </h1>
        <p style={{color:'red', fontWeight:'bolder', fontSize:32}}>
            Error: unexisted page
        </p>
    </div>
  )
}

export default Error