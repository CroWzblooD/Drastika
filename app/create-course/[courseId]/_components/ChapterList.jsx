import { CheckCircle2, Clock } from 'lucide-react'
import React from 'react'
import { FaBookOpen, FaClock } from 'react-icons/fa'

function ChapterList({course}) {
  return (
    <div className='mt-8'>
      <div className="flex items-center gap-3 mb-6">
        <FaBookOpen className="w-6 h-6 text-[#C8A087]" />
        <h2 className="text-2xl font-bold text-[#614434]">Course Chapters</h2>
      </div>
      <div className='space-y-4'>
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div 
            className='bg-white border border-[#E6D5C3] p-6 rounded-xl hover:shadow-md transition-all' 
            key={index}
          >
            <div className='flex gap-4 items-start'>
              <div className='bg-[#C8A087] h-10 w-10 text-white rounded-full flex items-center justify-center flex-shrink-0'>
                {index + 1}
              </div>
              <div className='flex-grow'>
                <h2 className='font-semibold text-lg text-[#614434]'>{chapter.chapter_name}</h2>
                <p className='text-[#8B4513] mt-2'>{chapter.about}</p>
                <div className='flex items-center gap-2 mt-3 text-[#C8A087]'>
                  <FaClock className="w-4 h-4" />
                  <span className='text-sm'>{chapter.duration}</span>
                </div>
              </div>
              <CheckCircle2 className='text-[#C8A087] w-6 h-6 flex-shrink-0' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterList