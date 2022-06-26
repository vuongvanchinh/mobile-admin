import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clear, append, getPosts } from '../../state/features/posts/postsSlice'
import Table from '../../components/table'
import { CircularProgress, TableCell, TableRow } from '@mui/material';
import { useNavigate } from "react-router-dom";
import timeSince from '../../utils/timeSince';
import priceFormat from '../../utils/priceFormat';
import {clearPosts} from '../../state/features/posts/postsSlice'
const columns = [
  { 
    display: 'Id',
    style: {maxWidth: 150, minWidth: 80}
  },
  { 
    display: 'Tiêu đề',
    style: { minWidth: 400 }
  },
  { 
    display: 'Giá thuê',
    style: {}
  },
  { 
    display: 'Thời gian tạo',
    style: {}
  },
  { 
    display: 'Người tạo',
    style: {}
  },
  { 
    display: 'Loại',
    style: {}
  },
  { 
    display: 'Trạng thái',
    style: {}
  },
  
];
const PostType = {
  0: (
    <div className='bg-01 text-00 px-2 py-1 rounded-md text-center'>Tìm zoomate</div>
  ),
  1: (
    <div className='bg-green-600 text-00 px-2 py-1 rounded-md text-center'>Cho thuê</div>
  ),
}

const PostStatus = {
  true:  (
    <div className='bg-01 text-00 px-2 py-1 rounded-md text-center'>Đã phê duyệt</div>
  ),
  false: (
    <div className='bg-red-400 text-00 px-2 py-1 rounded-md text-center'>Chưa phê duyệt</div>
  ),
}



const Posts = () => {
  let {data, isLoading} = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const renderItem = (data) => {
    return (
      <TableRow key={data._id} onClick={() => navigate(`/posts/${data._id}`)} className='hover:bg-00 transition-colors cursor-pointer'>
        <TableCell>{data._id}</TableCell>
        <TableCell>{data.title}</TableCell>
        <TableCell>{priceFormat(data.rentalPrice)}</TableCell>
        <TableCell>{timeSince(new Date(data.createdAt))}</TableCell>
        <TableCell>{data?.owner.name? data?.owner.name: '--' }</TableCell>
        <TableCell>{PostType[data.type]}</TableCell>
        <TableCell>{PostStatus[data.censored]}</TableCell>

      </TableRow>
    )
  }

  // data = data.map(item => {
   
    
  //   return {...item, id:item._id }
  // })
  useEffect(() => {
    // if (data.length === 0) {
    //    dispatch(getPosts())
    // }
    dispatch(clearPosts())
    dispatch(getPosts())
  }, [])
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
          <CircularProgress />
      </div>
  )
  }
  return (
    <div className='page'>
        <h1 className='heading-02 tet-02 mb-6'>Các bài Post</h1>

        <Table
          rows={data}
          columns={columns}
          renderItem={renderItem}
        />
    </div>
  )
}

export default Posts