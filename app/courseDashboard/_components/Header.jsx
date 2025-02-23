import { UserButton } from '@clerk/nextjs'
import { FaGraduationCap } from 'react-icons/fa'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-6 bg-[#FDF8F3] border-b border-[#E6D5C3]'> 
        <Link href="/" className="flex items-center gap-2">
            <FaGraduationCap className="w-8 h-8 text-[#8B4513]" />
            <span className="text-2xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
                Drastika
            </span>
        </Link>
        <UserButton />
    </div>
  )
}

export default Header