"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { FaRocket, FaMagic } from 'react-icons/fa';

const AddCourse = () => {
    const {user}=useUser();
  return (
    <div className='bg-[#FAF3ED] rounded-xl p-6 shadow-sm border border-[#E6D5C3]'>
        <div className='flex items-center justify-between'>
            <div>
                <h2 className='text-3xl text-[#614434]'>Welcome back, <span className='font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]'>{user?.fullName}</span></h2>
                <p className='text-[#8B4513] mt-2 flex items-center gap-2'>
                    <FaMagic className="w-4 h-4" />
                    Create personalized learning paths with AI assistance
                </p>
            </div>
            <Link href={'/create-course'}>
                <Button className="bg-[#C8A087] hover:bg-[#B38B6D] text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                    <FaRocket className="w-4 h-4" />
                    Create AI Path
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default AddCourse