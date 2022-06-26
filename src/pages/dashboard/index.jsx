import React, { useState } from 'react'
import { Button } from '@mui/material';
import request from '../../utils/request'
import SectionTypePost from './section-type-post'

import SectionTypeUser from './section-type-user'
import SectionNewPost from './section-new-post'
import SectionNewUser from './section-new-user'

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const onChange = (e) => {
    console.log(e)
    console.log(e.target.files)
    setImages(e.target.files)
  }

  const handleSubmit = () => {
    // alert("call")
    console.log(images)
    const formData = new FormData()
    Array.from(images).map(img => {
      formData.append("images", img)
    })
    // formData.append('title', 'chinh')
    console.log(formData)
    request({
      url: '/motel/6253eabb88dc03fb9b4fab75/upload-image',
      method: 'POST',
      data: formData
    }).then(res => console.log(res))
    
  }

  return (
    <div className='bg-00'>
      {/* <form>
        <input type="file" name="image" id="image" onChange={onChange} multiple={true} />
        <Button
          variant="contained"
          onClick={handleSubmit}
        >Submit</Button>
      </form> */}

      <div className="flex flex-wrap gap-6 gap-y-6 mt-16">
        <div className="grow flex flex-col gap-6 sm:w-full md:w-auto">
          <SectionNewPost />
          <SectionNewUser />
        </div>
       
        <div className=" flex flex-col gap-6 sm:w-full md:w-2/5">
          <SectionTypeUser />
          <SectionTypePost />
        </div>
       
        
      </div>
    </div>
  )
}

export default Dashboard