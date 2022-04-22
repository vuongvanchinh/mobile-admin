import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import request from '../../utils/request'
import timeSince from '../../utils/timeSince'

const UserDetail = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()

    const update = async (active) => {
        
    }
    useEffect(() => {
        (async() => {
            try {
                const res = await request({
                    url: `/user/${id}`,
                    method: 'GET'
                })
    
                setUser(res)
            } catch (error) {
                
            }
        })()

        return () => console.log('Detail unmount')
        
    }, [])

    if (!user.createdAt) {
        return 'Loading...'
    }
  
    return (
    <div className='page'>
       <div className="User-detail">
            <h2 className="heading-02">{user.email}</h2>
        </div>
    </div>
  )
}

export default UserDetail