import React from 'react'
import { FaChalkboardTeacher, FaBook, FaLightbulb, FaUsers } from 'react-icons/fa'

function NotesDashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#614434]">Teaching Resource Hub</h1>
        <p className="mt-2 text-[#8B4513]">Upload and manage your teaching materials, lesson plans, and educational resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: FaChalkboardTeacher,
            title: "Lesson Plans",
            description: "Create and organize your teaching materials"
          },
          {
            icon: FaBook,
            title: "Course Content",
            description: "Manage your educational resources"
          },
          {
            icon: FaLightbulb,
            title: "Teaching Ideas",
            description: "Get inspired with new teaching methods"
          },
          {
            icon: FaUsers,
            title: "Student Resources",
            description: "Share materials with your students"
          }
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-[#E6D5C3] hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-[#FAF3ED] rounded-lg flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-[#C8A087]" />
            </div>
            <h3 className="text-lg font-semibold text-[#614434]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#8B4513]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesDashboard