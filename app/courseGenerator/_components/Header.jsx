import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { FaGraduationCap } from 'react-icons/fa'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-5 bg-[#FDF8F3] border-b border-[#E6D5C3]'>
      <Link href="/" className="flex items-center gap-2">
        <FaGraduationCap className="w-8 h-8 text-[#8B4513]" />
        <span className="text-2xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
          Drastika
        </span>
      </Link>
      <Link href="/courseDashboard">
        <Button className="bg-[#C8A087] hover:bg-[#B38B6D] text-white px-6 py-2 rounded-lg transition-all">
          Access Dashboard
        </Button>
      </Link>
    </div>
  )
}

export default Header