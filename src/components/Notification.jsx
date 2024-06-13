import React from 'react'

function Notification({message}) {
  return (
    <div className='show-notification'> 
            <p>{message}</p>
            <img src='./images/success.png' className='success-img' />
             </div>
  )
}

export default Notification