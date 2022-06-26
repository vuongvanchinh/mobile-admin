import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import request from '../../utils/request'
import timeSince from '../../utils/timeSince'
import { Button, CircularProgress } from '@mui/material'

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

    const utilities = {
        "wifi": "Wifi","toilet": "WC riêng","ice-cream": "Tủ lạnh","washing-machine": "Máy giặt",
        "air-conditioner": "Điều hòa","clock": "Tự do gờ giấc","food":"Bếp nấu ăn","motorcycle":"Chỗ để xe"
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
        
    }, [id])

    if (!post.createdAt) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <CircularProgress />
            </div>
        )
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
                {PostType[Number(post.postType)]}
            </div>
            <div className='mb-6'>
                <p>{post.description}</p>
            </div>
            <div className="mb-6">
                <p className='mb-4'>Các tiện ích</p>
                <div className="flex gap-4">
                    {
                        post.utilities.map((item, index) => (
                            <div key={index} className="bg-sky-700 text-white px-4 py-1 rounded-md">
                                {utilities[item]}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='mb-4'>
                <span className="font-semibold">Giá:</span>
                <span className='font-bold text-red-500'>{Number(post.rentalPrice)}đ</span>
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