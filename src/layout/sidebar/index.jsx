import React, { useEffect } from 'react'
import './style.scss'
import Logo from '../../assets/logo.jpg'
import Menu from '../../components/menu'
import io from 'socket.io-client'
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../auth/authProvider'
const socket = io("https://mtapp-a.herokuapp.com")

const Sidebar = () => {
  const auth = useAuth()
  
  useEffect(() => {
    socket.emit("connection")
    socket.emit("created-motel", "6253eabb88dc03fb9b4fab75")
    socket.on("new-motel", (motel) => {
      console.log(motel)
    } )
  }, [])

  const logout = () => {
    auth.signout(() => {
     
    })

  }


  return (
    <div className='sidebar bg-000 flex flex-col'>
      <div className="logo p-2">
        <img src={Logo} alt="" className='rounded overflow-hidden' />
      </div>
      <Menu />
      <div className="grow"></div>
      <div className="flex gap-4 px-2 py-2 cursor-pointer text-03 hover:text-01 font-semibold"
        onClick={logout}
      >
        <LogoutIcon />
        <span>
          Logout
        </span>
       
      </div>
    </div>
  )
}

export default Sidebar