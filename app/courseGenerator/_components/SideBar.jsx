"use client";
import { BookOpen, Home, Settings, BookCheck, ChartBar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaGraduationCap } from 'react-icons/fa';

const SideBar = () => {
  const pathname = usePathname();

  const MenuList = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/courseDashboard",
    },
    {
      name: "Course Creation",
      icon: BookOpen,
      path: "/courseDashboard/Explore",
    },
    {
      name: "My Courses",
      icon: BookCheck,
      path: "/courseDashboard/courses",
    },
    {
      name: "Analytics",
      icon: ChartBar,
      path: "/courseDashboard/analytics",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/courseDashboard/setting",
    },
  ];

  return (
    <div className="h-screen p-5 border-r border-[#E6D5C3] bg-[#FDF8F3]">
      <div className="flex items-center gap-2 mb-8">
        <FaGraduationCap className="w-8 h-8 text-[#8B4513]" />
        <span className="text-xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
          Drastika
        </span>
      </div>
      <hr className="my-4 border-[#E6D5C3]" />
      <div className="mt-3">
        {MenuList.map((menu) => (
          <Link href={menu.path} key={menu.path}>
            <div
              className={`flex gap-3 items-center mt-2 p-3 rounded-lg cursor-pointer transition-all
              ${pathname === menu.path 
                ? "bg-[#C8A087] text-white" 
                : "text-[#614434] hover:bg-[#FAF3ED]"
              }`}
            >
              <menu.icon className="w-5 h-5" />
              <h2 className="text-sm font-medium">{menu.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
