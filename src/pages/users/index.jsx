import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../../state/features/users/usersSlice'
import Table from '../../components/table'
import { TableCell, TableRow } from '@mui/material';
import { useNavigate } from "react-router-dom";
import timeSince from '../../utils/timeSince';
const columns = [
  { 
    display: 'Id',
    style: {maxWidth: 150, minWidth: 80}
  },
  { 
    display: 'Tên',
    style: { minWidth: 400 }
  },
  { 
    display: 'Số điện thoại',
    style: {}
  },
  { 
    display: 'Email',
    style: {}
  },
  { 
    display: 'Nhu cầu',
    style: {}
  },
  { 
    display: 'Thời gian tham gia',
    style: {}
  },
  { 
    display: 'Địa chỉ',
    style: {}
  },
  { 
    display: 'Trạng thái',
    style: {}
  },
  
];

const UserRole = {
  lessor: (
    <div className='bg-emerald-800 text-00 px-2 py-1 rounded-md text-center'>Cho thuê</div>
  ),
  lessee:  (
    <div className='bg-01 text-00 px-2 py-1 rounded-md text-center'>Tìm phòng</div>
  ),
  admin: (
    <div className='bg-red-500 text-00 px-2 py-1 rounded-md text-center'>Quản trị</div>
  ),
}

const UserStatus = {
  false: (
    <div className='bg-red-500 text-00 px-2 py-1 rounded-md text-center'>Chưa kích hoạt</div>
  ),
  true: (
    <div className='bg-01 text-00 px-2 py-1 rounded-md text-center'>Đã kích hoạt</div>
  )
}


const Users = () => {
  let {data, isLoading} = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const renderItem = (data) => {
    return (
      <TableRow key={data._id} onClick={() => navigate(`/users/${data._id}`)} className='hover:bg-00 transition-colors cursor-pointer'>
        <TableCell>{data._id}</TableCell>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data.phone}</TableCell>
        <TableCell>{data.email}</TableCell>
        
        <TableCell>{UserRole[data.role]}</TableCell>
        <TableCell>{timeSince(new Date(data.createdAt))}</TableCell>
        <TableCell>{data.address}</TableCell>
        <TableCell>{UserStatus[data.active]}</TableCell>
        
      </TableRow>
    )
  }

  // data = data.map(item => {
   
    
  //   return {...item, id:item._id }
  // })
  useEffect(() => {
    if (data.length === 0) {
       dispatch(getUsers())
    }
   
  }, [])
  if (isLoading) {
    return "loading"
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

export default Users