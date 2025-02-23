import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { FaLightbulb, FaBookOpen } from 'react-icons/fa'

const TopicDescription = () => {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      <div className='space-y-3'> 
        <label className="flex items-center gap-2 text-[#614434] font-medium">
          <FaLightbulb className="w-5 h-5 text-[#C8A087]" />
          What topic would you like to create a course about?
        </label>
        <Input 
          placeholder='e.g., Advanced JavaScript Concepts'
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange('topic', e.target.value)}
          className="border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087]"
        />
      </div>

      <div className='space-y-3'>
        <label className="flex items-center gap-2 text-[#614434] font-medium">
          <FaBookOpen className="w-5 h-5 text-[#C8A087]" />
          Describe what you want to include in this course
        </label>
        <Textarea 
          placeholder='Describe the key concepts, learning objectives, and desired outcomes...'
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="min-h-[150px] border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087]"
        />
      </div>
    </div>
  )
}

export default TopicDescription