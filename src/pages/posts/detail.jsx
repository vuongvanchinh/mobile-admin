import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import request from '../../utils/request'
import timeSince from '../../utils/timeSince'
import { Button } from '@mui/material'

const PostType = {
    0: (
      <div className='bg-01 text-00 px-2 py-1 rounded-md text-center'>Tìm zoomate</div>
    ),
    1: (
      <div className='bg-green-600 text-00 px-2 py-1 rounded-md text-center'>Cho thuê</div>
    ),
  }

const PostDetail = () => {
    const [post, setPost] = useState({})
    const {id} = useParams()
    const [isUpdating, setIsUpdating] = useState(false)

    const update = async (censored) => {
        if (!isUpdating) {
            setIsUpdating(true)
            const res = await request({
                url: `/motel/${id}/censored`,
                method: 'PUT',
                data: {
                    censored:  censored
                }
            })
            setIsUpdating(false)
            console.log(post)
            setPost({
                ...post,
                censored: censored
            })
        }
    }
    const action = {
        true: (
            <Button variant='contained' onClick={() => update(false)} disabled={isUpdating}>Hủy phê duyệt</Button>
        ),
        false: (
            <Button variant='contained' onClick={() => update(true)} disabled={isUpdating}>Duyệt</Button>
        )
    }

    useEffect(() => {
        (async() => {
            try {
                const res = await request({
                    url: `/motel/${id}`,
                    method: 'GET'
                })
    
                setPost(res)
            } catch (error) {
                
            }
        })()

        return () => console.log('Detail unmount')
        
    }, [])

    if (!post.createdAt) {
        return 'Loading...'
    }
  
    return (
    <div className='page'>
       <div className="post-detail max-w-[960px] mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="heading-02">{post.title}</h2>
                {
                    action[post.censored]
                }
            </div>
            <div className="flex gap-6 mb-6 items-center">
                <div>
                    Thời gian tạo: 
                    {
                        timeSince(new Date(post.createdAt))
                    }
                </div>
                <div>
                    Tác giả:
                    <Link to={`/users/${post.owner._id}`} className='font-semibold text-01'>
                         {post.owner.name ? post.owner.name:'-_-'}
                    </Link>
                </div>
                {PostType[post.type]}
            </div>
            <div className='mb-6'>
                <p>{post.description}</p>
            </div>

            <div className="media">
                <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    {post.images.map((item, index) =>(
                        <div className="p" key={index}>
                            <img src={item.url} />
                        </div>
                    ))}
                </div>
            </div>
       </div>
    </div>
  )
}

export default PostDetail