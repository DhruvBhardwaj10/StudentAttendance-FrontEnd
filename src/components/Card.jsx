import React from 'react'

export default function Card({icon,title,value}) {
  return (
    <div className='flex items-center gap-5 p-7  bg-sky-100 rounded-lg shadow-sm '>
   <div className='p-2 h-12 w-10 rounded-full bg-white text-blue-500'>
    {icon}
   </div>
   <div>
    <h2 className='font-bold'>{title}</h2>
    <h2 className='text-lg'>{value}</h2>

   </div>

    </div>
  )
}
