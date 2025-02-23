import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'

function Header() {
  return (
    <div className='flex items-center justify-between p-5 shadow-md bg-white'>
      <div className="flex items-center gap-3">
        <FaGraduationCap className="w-6 h-6 text-[#C8A087]" />
        <h1 className="text-xl font-semibold text-[#614434]">Teaching Resources</h1>
      </div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default Header