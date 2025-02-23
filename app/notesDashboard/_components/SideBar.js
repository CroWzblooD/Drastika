"use client"
import { Button } from '@/components/ui/button';
import { FaBook, FaHome, FaChalkboardTeacher, FaCog, FaFileUpload } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState } from 'react';
import UploadPdfDialog from './UploadPdfDialog'

const SideNav = () => {
  const [path, setPath] = useState("");

  const MenuList = [
    {
      name: 'Teaching Workspace',
      icon: FaChalkboardTeacher,
      path: '/notesDashboard',
    },
    {
      name: 'Course Dashboard',
      icon: FaBook,
      path: '/courseDashboard',
    },
    {
      name: 'Settings',
      icon: FaCog,
      path: '/settings',
    }
  ];

  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <Link href="/" className="flex justify-center mb-6">
        <span className="text-3xl font-semibold text-[#C8A087]">
          Drastika
        </span>
      </Link>

      <UploadPdfDialog>
        <Button className='w-full bg-[#C8A087] hover:bg-[#B38B6D] text-white flex items-center gap-2'>
          <FaFileUpload />
          Upload Teaching Resource
        </Button>
      </UploadPdfDialog>

      <hr className="my-6 border-[#E6D5C3]" />

      <div className="space-y-2">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
              ${path === menu.path 
                ? 'bg-[#FAF3ED] text-[#C8A087]' 
                : 'text-[#614434] hover:bg-[#FDF8F3]'}`}
            >
              <menu.icon className="w-5 h-5" />
              <h2 className="font-medium">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;