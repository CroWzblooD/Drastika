import React, { useContext } from 'react'
import CategoryList from '@/app/create-course/_shared/CategoryList'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { FaCode, FaGraduationCap, FaBriefcase } from 'react-icons/fa'

const SelectCategory = () => {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev => ({
      ...prev,
      category: category 
    }))
  }

  // Map category names to icons
  const getIcon = (categoryName) => {
    switch(categoryName) {
      case 'Programming & other skills':
        return FaCode;
      case 'College Subjects':
        return FaGraduationCap;
      case 'Interview':
        return FaBriefcase;
      default:
        return FaCode;
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
      {CategoryList.map((item, index) => {
        const IconComponent = getIcon(item.name)
        return (
          <div 
            key={index}
            className={`flex flex-col items-center p-8 rounded-xl border transition-all cursor-pointer
              ${userCourseInput?.category === item.name 
                ? 'border-[#C8A087] bg-[#FAF3ED] shadow-lg' 
                : 'border-[#E6D5C3] hover:border-[#C8A087] hover:bg-[#FDF8F3]'}`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <IconComponent className={`w-12 h-12 mb-4 ${userCourseInput?.category === item.name ? 'text-[#8B4513]' : 'text-[#C8A087]'}`} />
            <h2 className={`text-lg font-medium text-center ${userCourseInput?.category === item.name ? 'text-[#614434]' : 'text-[#8B4513]'}`}>
              {item.name}
            </h2>
          </div>
        )
      })}
    </div>
  )
}

export default SelectCategory