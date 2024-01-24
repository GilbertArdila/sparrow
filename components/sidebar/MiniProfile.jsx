import Image from 'next/image';
import React from 'react'

const MiniProfile = () => {
  return (
    <div className='flex space-x-2 items-center justify-center xl:justify-start mt-auto text-gray-700 hoverEffect'>
        <Image 
        src="https://avatars.githubusercontent.com/u/88728941?v=4" 
        alt='user image' 
        width={"40"} 
        height={"40"}
        className='rounded-full  xl:mr-2 '
        />
        <div className='leading-5 hidden xl:inline'>
         <h4 className='font-bold'>Sahand Gavidel</h4>
        <span className='text-gray-500'>@codewithsahand</span>   
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-8 hidden xl:inline">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

        

    </div>
  )
}

export default MiniProfile;