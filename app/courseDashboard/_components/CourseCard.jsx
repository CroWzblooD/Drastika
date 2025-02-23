import Link from "next/link";
import { FaBookOpen, FaChartBar, FaGraduationCap } from 'react-icons/fa';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl border border-[#E6D5C3] hover:shadow-lg transition-all cursor-pointer p-5">
      <div>
        <Link href={'/course/'+course?.courseId}>
          <h2 className="font-semibold text-xl text-[#614434] mb-3">
            {course?.courseOutput?.course?.course_name}
          </h2>
        </Link>
        
        <div className="flex items-center gap-2 bg-[#FAF3ED] rounded-lg p-3 mb-4">
            <FaBookOpen className="w-4 h-4 text-[#C8A087]" />
            <div className="text-[#8B4513]">
                <span className="font-medium">Chapters: </span>
                <span>{course?.courseOutput?.course?.number_of_chapters}</span>
            </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-2 bg-[#F5E6D3] rounded-lg px-3 py-2">
                <FaGraduationCap className="w-4 h-4 text-[#C8A087]" />
                <span className="text-[#614434] font-medium">{course?.category}</span>
            </div>
            
            <div className="flex items-center gap-2 text-[#8B4513]">
                <FaChartBar className="w-4 h-4" />
                <span>{course?.difficulty} Level</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
