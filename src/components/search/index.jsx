import React, { useEffect, useState } from 'react'
import Table from '../../components/table'
import { CircularProgress, TableCell, TableRow } from '@mui/material';
import { useNavigate } from "react-router-dom";
import timeSince from '../../utils/timeSince';
import priceFormat from '../../utils/priceFormat';
import request from '../../utils/request';

const columns = [
  { 
    display: 'Tiêu đề',
    style: { minWidth: 250 }
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



const Posts = ({handleClose, query}) => {
  let [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const renderItem = (data) => {
    return (
      <TableRow key={data._id} onClick={() => { navigate(`/posts/${data._id}`); handleClose() }} className='hover:bg-00 transition-colors cursor-pointer'>
        {/* <TableCell>{data._id}</TableCell> */}
        <TableCell>{data.title}</TableCell>
        <TableCell>{priceFormat(data.rentalPrice)}</TableCell>
        <TableCell>{timeSince(new Date(data.createdAt))}</TableCell>
        <TableCell>{data?.owner.name? data?.owner.name: '--' }</TableCell>
        <TableCell>{PostType[data.type]}</TableCell>
        <TableCell>{PostStatus[data.censored]}</TableCell>

      </TableRow>
    )
  }

  useEffect(() => {
    if(query) {
      const f = async () => {
        try {
            request({
                url: `/motel?title=${query}`
            }).then(res => {
                setData(res)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
      }
      f()
    }
   
  }, [query])
  
  return (
    <div className='p-4 shadow-md rounded-md not-shadow bg-000'>
        <h1 className='heading-02 tet-02 mb-6'>Kết quả tìm kiếm</h1>
        {
            loading? (
                <div className="flex justify-center items-center h-[100%]">
                    <CircularProgress />
                </div>
            ): null

        }
        {!loading && data.length === 0 ? (
            <div className="">
                Không có kết quả nào
            </div>
        ): (
            (
                <Table
                    rows={data}
                    columns={columns}
                    renderItem={renderItem}
                    />
            )
        )
        } 
        
    </div>
  )
}

export default Posts