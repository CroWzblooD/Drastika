import React from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className='w-64 fixed h-screen hidden md:block border-r border-[#E6D5C3]'>
        <SideNav/>
      </div>
      <div className='md:ml-64'> 
        <Header/>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout