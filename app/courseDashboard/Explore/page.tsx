import React from 'react'
import { FaCompass } from 'react-icons/fa'

const Explore = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaCompass className="w-6 h-6 text-[#C8A087]" />
        <h1 className="text-2xl font-bold text-[#614434]">Explore Learning Paths</h1>
      </div>
      
      <div className="bg-[#FAF3ED] rounded-xl border border-[#E6D5C3] p-8 text-center">
        <p className="text-[#8B4513]">Coming soon! Discover and share AI-generated learning paths.</p>
      </div>
    </div>
  )
}

export default Explore