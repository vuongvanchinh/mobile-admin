import React from 'react'
import './style.scss'
import Logo from '../../assets/logo.jpg'
import Menu from '../../components/menu'

const Sidebar = () => {
  return (
    <div className='sidebar bg-000'>
      <div className="logo p-2">
        <img src={Logo} alt="" className='rounded overflow-hidden' />
      </div>
      <Menu />
    </div>
  )
}

export default Sidebar