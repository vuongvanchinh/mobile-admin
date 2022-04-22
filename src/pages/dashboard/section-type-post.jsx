import React, { useEffect, useState } from 'react'
import Doughnut from '../../components/doughnut';
import request from '../../utils/request';
const d = {
  label: '',
  data: [12, 19],
  backgroundColor: [
    '#2563eb',
    '#db2777',
  ],
  // borderColor: [
  //   'rgba(255, 99, 132, 1)',
  //   'rgba(54, 162, 235, 1)',
  // ],
  borderWidth: 0,
}

const dataSample = {
  chartData: {
    labels: ['Cho thuê', 'Tìm zoomate',],
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
          url: '/motel/stats?type=1',
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
        Tỷ trọng mục đích của các bài đăng
      </div>
      <div className='relative'>
          <Doughnut
            data={data.chartData}
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2  ">
            {data.total} Bài đăng
          </span>
      </div>
    </div>
  )
}

export default SectionTypePost