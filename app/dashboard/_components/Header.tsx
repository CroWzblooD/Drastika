import { Search } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 border-b border-[#E6D5C3] bg-white flex justify-between items-center'>
      <div className='flex gap-3 items-center p-2.5 border border-[#E6D5C3] rounded-lg bg-[#FAF3ED] max-w-xl'>
        <Search className="text-[#C8A087]"/>
        <input 
          type="text" 
          placeholder='Search teaching resources...' 
          className='outline-none bg-transparent text-[#614434] placeholder-[#B38B6D] w-full'
        />
      </div>
      <div className="flex items-center gap-4">
        <h2 className='bg-[#C8A087] px-4 py-2 rounded-lg text-sm text-white font-medium'>
          Empowering Educators
        </h2>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}

export default Header