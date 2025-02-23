import { Button } from "@/components/ui/button";
import { FaGraduationCap, FaRocket } from 'react-icons/fa';
import Link from "next/link";
import React from "react";

function CourseBasicInfo({ course }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-[#E6D5C3] shadow-sm p-8">
        <div className="flex items-start gap-6">
          <div className="bg-[#FAF3ED] p-4 rounded-xl">
            <FaGraduationCap className="w-12 h-12 text-[#C8A087]" />
          </div>
          
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-[#614434]">
              {course?.courseOutput?.course?.course_name}
            </h2>
            <p className="text-[#8B4513] mt-4 leading-relaxed">
              {course?.courseOutput?.course?.description}
            </p>
            
            <div className="flex items-center gap-3 mt-6 text-[#614434]">
              <span className="bg-[#FAF3ED] px-4 py-2 rounded-lg flex items-center gap-2">
                <FaGraduationCap className="w-4 h-4 text-[#C8A087]" />
                {course?.category}
              </span>
            </div>
            
            <Link href={'/course/'+course?.courseId +'/start'}>
              <Button className="mt-8 bg-[#C8A087] hover:bg-[#B38B6D] text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                <FaRocket className="w-4 h-4" />
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
