import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Button } from "./ui/button";
import Link from "next/link";
import { FaChalkboardTeacher, FaChartLine, FaLightbulb, FaBrain, FaRocket, FaGraduationCap } from "react-icons/fa";
import { BsStars, BsGraphUp } from "react-icons/bs";

export function TimelineDemo() {
  const data = [
    {
      title: "Professional Development Hub",
      content: (
        <div className="space-y-4 timeline-card bg-[#FDF8F3] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#C8A087] to-[#8B4513] flex items-center gap-3">
            Teacher Growth Analytics
            <Link href={'/professional-development'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Track Progress
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Comprehensive tracking of professional development milestones. Monitor teaching effectiveness, 
            implementation success, and skill growth with AI-powered analytics designed specifically for educator development.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaChartLine className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📈</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Growth Metrics</span>
              <BsStars className="w-6 h-6 text-[#DEB887] mt-2 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaBrain className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">🎯</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Skill Development</span>
              <BsGraphUp className="w-6 h-6 text-[#DEB887] mt-2 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI Course Creation Suite",
      content: (
        <div className="space-y-4 timeline-card bg-[#FDF8F3] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#C8A087] to-[#8B4513] flex items-center gap-3">
            AI Course Generator
            <Link href={'/courseGenerator'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Generate Course
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Transform your teaching expertise into structured courses. Our AI analyzes your curriculum needs 
            and automatically generates customized professional development courses, complete with assessments, 
            activities, and progress tracking tools.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaChartLine className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">🎯</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Custom Curriculum</span>
              <BsStars className="w-6 h-6 text-[#DEB887] mt-2 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaBrain className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📚</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Auto-Generated Content</span>
              <BsGraphUp className="w-6 h-6 text-[#DEB887] mt-2 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Interactive Learning Assistant",
      content: (
        <div className="space-y-4 timeline-card bg-[#FAF3ED] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#DEB887] to-[#8B4513] flex items-center gap-3">
            Interactive PDF Tutor
            <Link href={'/notesDashboard'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Transform PDFs
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Convert static teaching materials into interactive learning experiences. Our AI transforms your PDF resources 
            into dynamic tutoring content, creating engaging lessons with built-in assessments and real-time feedback 
            for enhanced teacher training.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaRocket className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📝</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">PDF Enhancement</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">✨</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaGraduationCap className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">🤖</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Interactive Learning</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">📚</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Teaching Resource Manager",
      content: (
        <div className="space-y-4 timeline-card bg-[#F5E6D3] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#B38B6D] to-[#8B4513] flex items-center gap-3">
            Video-Based Learning Analysis
            <Link href={'/researchPaper'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Analyze Content
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Enhance professional development through video analysis. Extract teaching insights, identify effective strategies, 
            and create shareable learning resources from educational video content to improve classroom implementation.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaLightbulb className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">🎥</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Video Analysis</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">🎯</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaBrain className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📝</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Smart Summaries</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">✨</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Professional Content Studio",
      content: (
        <div className="space-y-4 timeline-card bg-[#FDF8F3] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#C8A087] to-[#8B4513] flex items-center gap-3">
            Development Material Generator
            <Link href={'/dashboard'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Create Resources
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Generate high-quality professional development materials with AI assistance. Create customized training content, 
            implementation guides, and assessment tools tailored to your teaching development needs.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaLightbulb className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">✍️</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Content Creation</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">🎨</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaBrain className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📚</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Lesson Planning</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">✨</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Career Development Optimizer",
      content: (
        <div className="space-y-4 timeline-card bg-[#FAF3ED] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#DEB887] to-[#8B4513] flex items-center gap-3">
            Teaching Excellence Portfolio
            <Link href={'/ats'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Build Portfolio
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Showcase your professional growth journey with AI-optimized portfolios. Highlight teaching achievements, 
            implementation successes, and development milestones to demonstrate your commitment to educational excellence.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaRocket className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📄</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Resume Enhancement</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">⭐</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDF8F3] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaGraduationCap className="w-12 h-12 text-[#DEB887] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">👔</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Skill Highlighting</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">✨</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Personal Productivity Planner",
      content: (
        <div className="space-y-4 timeline-card bg-[#FDF8F3] dark:bg-gray-800/90">
          <h2 className="text-2xl font-bold gradient-text from-[#C8A087] to-[#8B4513] flex items-center gap-3">
            Smart Task Management
            <Link href={'/todo'}>
              <Button className="bg-[#E6D5C3] text-[#614434] hover:bg-[#D4C0AA] transform hover:scale-105 transition-all">
                Start Planning
              </Button>
            </Link>
          </h2>
          <p className="text-[#614434] dark:text-cream-100 leading-relaxed">
            Optimize your teaching schedule and tasks with AI-powered planning. Prioritize activities, track progress, and maintain work-life balance.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaRocket className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">📅</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Smart Planning</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">⚡</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FAF3ED] rounded-xl hover:shadow-lg transition-all group">
              <div className="flex items-center justify-center mb-4">
                <FaChartLine className="w-12 h-12 text-[#C8A087] group-hover:scale-110 transition-transform" />
                <span className="text-3xl ml-2">⏱️</span>
              </div>
              <span className="text-lg font-semibold text-[#614434]">Time Optimization</span>
              <span className="text-2xl mt-2 group-hover:rotate-12 transition-transform">📈</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-[#FDF8F3]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
      AI-Powered Teaching Excellence Platform
      </h2>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-[#C8A087] via-[#DEB887] to-[#8B4513] transform -translate-x-1/2"></div>
        <Timeline data={data} />
      </div>
    </div>
  );
}
