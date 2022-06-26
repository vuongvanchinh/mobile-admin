import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import request from '../../utils/request'
import timeSince from '../../utils/timeSince'
import CircularProgress from '@mui/material/CircularProgress';
const UserDetail = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()
    const [isUpdating, setIsUpdating] = useState(false)

    const update = async (active) => {
        if (!isUpdating) {
            setIsUpdating(true)
            const res = await request({
                url: `/user/${user._id}`,
                method: 'PUT',
                data: {
                    active:  active
                }
            })
            setIsUpdating(false)
            setUser(res)
        }
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
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <CircularProgress />
            </div>
        )
    }
    

    const action = {
        true: (
            <Button variant='contained' onClick={() => update(false)} disabled={isUpdating}>Hủy kích hoạt</Button>
        ),
        false: (
            <Button variant='contained' onClick={() => update(true)} disabled={isUpdating}>Kích hoạt</Button>
        )
    }
  
    return (
    <div className='page'>
       <div className="User-detail flex justify-between">
            <h2 className="heading-02">{user.email}</h2>
            {action[user.active]}
        </div>
        <div className='font-medium mt-8'>
            <p className='mb-4 font-semibold'>Tên người dùng: <span className='font-semibold'>{user.name?  user.name : '<<Chưa thiết lập>>'}</span></p>
        </div>
        <div className='font-medium mt-8'>
            <p className='mb-4 font-semibold'>Các vùng người dùng này quan tâm</p>
            <div className="flex px-4 gap-4">
                {user.favoriteAreas.map((item, index) => (
                    <div key={index}
                        className='px-4 py-1 bg-slate-500 rounded-md'
                    >{item}</div>
                ))}
                {user.favoriteAreas.length === 0 && (
                    <div className='text-red-500'>
                        Người dùng này chưa quan tâm vùng nào
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default UserDetail