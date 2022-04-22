import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Modal, Box, CircularProgress } from '@mui/material';
import Search from'../../components/search'
const TopHeader = () => {
    const [query, setQuery] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => {
        setOpenModal(false)
    }

    const onClick = () => {
        if (query) {
            setOpenModal(true)
        }
    }
  return (
    <div className='my-4 ml-6'>
        <div className="relative inline shadow-md">
            <input type="text" className='px-4 pr-[60px] py-2 rounded-3xl bg-000 outline-0 min-w-[350px]'
                placeholder='Search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                onClick={onClick}
                className='absolute py-2 px-4 rounded-3xl right-0 bg-01 hover:bg-010 text-00 transition-colors'>
                <SearchIcon className='h-full'/>
            </button>
        </div>
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='p-4 flex justify-center w-1/2  my-0 mx-auto'>
                <div className='w-full'>
                    <Search query={query} handleClose ={handleClose}/>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default TopHeader