import React, { useEffect, useState } from 'react'
import Doughnut from '../../components/doughnut';
import request from '../../utils/request';
const d = {
  label: '',
  data: [12, 19],
  backgroundColor: [
    '#9333ea',
    '#059669',
  ],
  // borderColor: [
  //   'rgba(255, 99, 132, 1)',
  //   'rgba(54, 162, 235, 1)',
  // ],
  borderWidth: 0,
}

const dataSample = {
  chartData: {
    labels: ['Cho thuê phòng', 'Tìm phòng',],
    datasets: [
      d
    ],
  }
}
const SectionTypePost = () => {
  const [data, setData] = useState(dataSample)

  useEffect(() => {
    const f = async () => {
      try {
        const res = request({
          url: '/user/stats?role=lessor',
          method: 'GET'
        }).then(res => {
          const nData = {...d, data: [res.primary, res.secondary]}
          
          setData({
            ...data,
            total: res.total,
            chartData: {...data.chartData, datasets: [nData]}

          })
        })
      } catch (error) {
        
      }
    }
    f()
  }, [])

  return (
    <div className='p-4 shadow-md bg-000 rounded-md'>
      <div className="heading-02 mb-6">
        Tỷ trọng mục đích tạo tài khoản của người dùng
      </div>
      <div className='relative'>
          <Doughnut
            data={data.chartData}
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
            {data.total} người dùng
          </span>
      </div>
    </div>
  )
}

export default SectionTypePost