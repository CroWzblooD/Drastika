"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaChartPie,
  FaBookReader,
  FaCertificate,
  FaUserClock,
  FaLightbulb,
  FaBrain,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/professional-development",
    icon: FaChartPie,
  },
  {
    title: "Learning Path",
    href: "/professional-development/learning",
    icon: FaGraduationCap,
  },
  {
    title: "Skills & Competencies",
    href: "/professional-development/skills",
    icon: FaBrain,
  },
  {
    title: "Certifications",
    href: "/professional-development/certifications",
    icon: FaCertificate,
  },
  {
    title: "Teaching Resources",
    href: "/professional-development/resources",
    icon: FaBookReader,
  },
  {
    title: "AI Insights",
    href: "/professional-development/insights",
    icon: FaLightbulb,
  },
];

export default function ProfessionalDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
   <Navbar/>
    <div className="flex h-screen bg-[#FDF8F3]">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-30">
        <div className="flex flex-col h-full mt-14">
          {/* Logo/Title */}
          <div className="p-6 border-b border-[#E6D5C3]">
            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="w-8 h-8 text-[#C8A087]" />
              <h1 className="text-xl font-bold text-[#614434]">
                Professional Development
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  pathname === item.href
                    ? "bg-[#FAF3ED] text-[#C8A087] shadow-sm"
                    : "text-[#614434] hover:bg-[#FAF3ED] hover:text-[#C8A087]"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Profile Section - Now positioned correctly */}
          <div className="p-4 mt-auto border-t border-[#E6D5C3] mb-14">
            <div className="flex items-center gap-3 p-4 bg-[#FAF3ED] rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#C8A087] flex items-center justify-center">
                <FaUserClock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-[#614434]">Teacher Profile</p>
                <p className="text-sm text-[#8B4513]">Professional Level 3</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-x-hidden">
        <div className="container mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
    </>
  );
} 