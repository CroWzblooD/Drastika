import { FaClock } from 'react-icons/fa'
import React from 'react'

function ChapterListCard({chapter, index, isSelected}) {
  return ( 
    <div className={`p-4 border-b border-[#E6D5C3] transition-all
      ${isSelected 
        ? 'bg-[#FAF3ED] border-l-4 border-l-[#C8A087]' 
        : 'hover:bg-[#FDF8F3]'}`}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${isSelected ? 'bg-[#C8A087] text-white' : 'bg-[#FAF3ED] text-[#8B4513]'}`}>
            {index + 1}
          </div>
        </div>
        
        <div className="flex-grow">
          <h2 className={`font-medium ${isSelected ? 'text-[#614434]' : 'text-[#8B4513]'}`}>
            {chapter?.chapter_name}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-[#C8A087]">
            <FaClock className="w-3 h-3" />
            <span>{chapter?.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterListCard