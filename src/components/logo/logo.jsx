import React from 'react'

import logo from './logo.jpg'
import './logo.less'

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="logo"/>
    </div>
  )
}

export default Logo