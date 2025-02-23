import { UserButton } from '@clerk/nextjs'
import { FaGraduationCap, FaHome } from 'react-icons/fa'
import Link from 'next/link'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='h-16 px-6 flex items-center justify-between shadow-sm border-b border-[#E6D5C3] bg-white'>
      <div className="flex items-center gap-4">
        <Link 
          href="/notesDashboard" 
          className="flex items-center gap-2 text-[#C8A087] hover:text-[#B38B6D] transition-colors"
        >
          <FaHome className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        <div className="h-6 w-px bg-[#E6D5C3]" />
        <div className="flex items-center gap-2 text-[#614434]">
          <FaGraduationCap className="w-5 h-5 text-[#C8A087]" />
          <span className="font-medium">Teaching Workspace</span>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default WorkspaceHeader