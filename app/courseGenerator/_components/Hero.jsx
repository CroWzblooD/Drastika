import React from 'react'
import { FaRocket, FaBrain, FaChalkboardTeacher } from 'react-icons/fa'

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#FDF8F3] to-[#FAF3ED]">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-6">
            <span className="gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
              AI-Powered Course Generation
            </span>
            <span className="block text-[#614434] text-3xl mt-4">
              Transform Your Teaching Expertise Into Structured Learning Paths
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-[#8B4513] leading-relaxed">
            Create personalized professional development courses with AI assistance. 
            Generate curriculum, assessments, and interactive content tailored to your teaching needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <FaBrain className="w-8 h-8 text-[#C8A087]" />
              </div>
              <h3 className="text-[#614434] font-semibold">Smart Course Design</h3>
              <p className="text-[#8B4513] text-sm mt-2">AI-powered curriculum generation and learning objectives</p>
            </div>
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <FaChalkboardTeacher className="w-8 h-8 text-[#C8A087]" />
              </div>
              <h3 className="text-[#614434] font-semibold">Interactive Content</h3>
              <p className="text-[#8B4513] text-sm mt-2">Engaging materials and assessments for effective learning</p>
            </div>
            <div className="bg-white/80 p-6 rounded-xl shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <FaRocket className="w-8 h-8 text-[#C8A087]" />
              </div>
              <h3 className="text-[#614434] font-semibold">Progress Tracking</h3>
              <p className="text-[#8B4513] text-sm mt-2">Real-time analytics and implementation monitoring</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="px-8 py-3 rounded-lg bg-[#C8A087] hover:bg-[#B38B6D] text-white transition-all font-medium"
              href="/courseDashboard"
            >
              Start Creating
            </a>

            <a
              className="px-8 py-3 rounded-lg border-2 border-[#C8A087] text-[#614434] hover:bg-[#FAF3ED] transition-all font-medium"
              href="#features"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero