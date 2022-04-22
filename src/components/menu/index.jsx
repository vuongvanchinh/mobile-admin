import React from 'react'
import {
    useResolvedPath,
    useMatch,
    Link,
    useLocation
} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import DynamicFeedSharpIcon from '@mui/icons-material/DynamicFeedSharp';
import GroupIcon from '@mui/icons-material/Group';
import './style.scss'
const menus = [
    {
        display: 'Dashboard',
        href:'/',
        icon: <DashboardIcon/>
    },
    {
        display: 'Post',
        href:'/posts',
        icon: <DynamicFeedSharpIcon/>
    },
    {
        display: 'Users',
        href:'/users',
        icon: <GroupIcon />
    }
]
const checkMatch = (path, current) => {
    if (path === '/') {
        return current === '/' 
    }
    return current.startsWith(path)
}
function CustomLink({ children,  to, ...props }) {
    const location = useLocation()
    // console.log("🚀 ~ file: index.jsx ~ line 37 ~ CustomLink ~ useLocation", useLocation)
    
    const match = checkMatch(to, location.pathname)
  
    return (
        <div>
            <Link
                className={`py-3 px-2 font-semibold block text-03 hover:text-01 transition-colors ${match && 'bg-00 font-semibold rouded-4 text-01'}`}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
        
    );
  }

const Menu = () => {
  return (
    <div>
        {
            menus.map((item, index) => (
                <CustomLink key={index} to={item.href} >
                    <div className='flex gap-4'>
                        {item.icon}{item.display}
                    </div>
                </CustomLink>
                    
            ))
        }
    </div>
  )
}

export default Menu