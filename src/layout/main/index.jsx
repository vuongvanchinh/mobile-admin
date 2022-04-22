import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '../sidebar'
import TopHeader from '../top-header'

import './style.scss'
import {
  Outlet,  
 
} from "react-router-dom";
import { RequireAuth }  from '../../auth/authProvider'


const MainLayout = props => {
  return (
    <RequireAuth>
      <div className='flex bg-00 min-h-[100vh]'>
        <Sidebar />
        <main className='grow min-h-[100vh px-6'>
          <TopHeader  />
          <Outlet />
        </main>
      </div>
    </RequireAuth>
      
    
    
  )
}

export default MainLayout