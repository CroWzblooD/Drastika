import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import { Toaster } from 'sonner';

function DashboardLayout({children}) {
  return (
    <div className="bg-[#FDF8F3]">
      <div className='w-64 h-screen fixed'>
        <SideBar/>
      </div>
      <div className='ml-64'>
        <Header/>
        <main className="p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default DashboardLayout