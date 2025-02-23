"use client";
import { FaChalkboardTeacher, FaHistory, FaCog, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const SideNav = () => {
  const [path, setPath] = useState("");

  const MenuList = [
    {
      name: 'Teaching Hub',
      icon: FaHome,
      path: '/dashboard',
    },
    {
      name: 'Resource History',
      icon: FaHistory,
      path: '/dashboard/history',
    },
    {
      name: 'Settings',
      icon: FaCog,
      path: '/dashboard/setting',
    },
  ];

  return (
    <div className="h-screen p-5 border-r border-[#E6D5C3] bg-white">
      <Link href="/" className="flex justify-center mb-6">
        <span className="text-3xl font-semibold text-[#C8A087]">
          Drastika
        </span>
      </Link>
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
