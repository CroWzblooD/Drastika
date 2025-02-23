import { FaGraduationCap } from 'react-icons/fa';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#FDF8F3]/80 backdrop-blur-md border-b border-[#E6D5C3] dark:bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <FaGraduationCap className="w-8 h-8 text-[#8B4513]" />
            <span className="text-2xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
              Drastika
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courseGenerator" className="text-[#614434] hover:text-[#8B4513] transition-colors">
              Course Creation
            </Link>
            <Link href="/notesDashboard" className="text-[#614434] hover:text-[#8B4513] transition-colors">
              Learning Hub
            </Link>
            <Link href="/videoInsightExtractor" className="text-[#614434] hover:text-[#8B4513] transition-colors">
              Resources
            </Link>
            <Link href="/aiContentCreator" className="text-[#614434] hover:text-[#8B4513] transition-colors">
              Content Studio
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/courseGenerator">
              <button className="bg-[#C8A087] hover:bg-[#B38B6D] text-white px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 