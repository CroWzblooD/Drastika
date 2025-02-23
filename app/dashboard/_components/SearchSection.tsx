import { Search } from 'lucide-react'
import React from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div className='p-12 bg-gradient-to-br from-[#C8A087] via-[#B38B6D] to-[#8B4513] flex flex-col justify-center items-center text-white'>
      <div className="flex items-center gap-3 mb-4">
        <FaChalkboardTeacher className="w-8 h-8" />
        <h2 className='text-3xl font-bold'>Teaching Resources</h2>
      </div>
      <p className="mb-6">Discover tools and templates to enhance your teaching</p>
      <div className='w-full max-w-2xl'>
        <div className='flex gap-3 items-center p-3 bg-white rounded-lg shadow-lg'>
          <Search className='text-[#C8A087]'/>
          <input 
            type="text" 
            placeholder="Search for teaching templates..." 
            className='bg-transparent outline-none text-[#614434] placeholder-[#B38B6D] w-full'
            onChange={(event)=>onSearchInput(event.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection