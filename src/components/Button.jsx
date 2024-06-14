import React from 'react'
import '../App.css';

function Button({title,action}) {

  return (<>
    <div className="button">
                <button onClick={action}>{title}</button>
                <div className="divider"></div>
            </div>
  </>
  )
}

export default Button