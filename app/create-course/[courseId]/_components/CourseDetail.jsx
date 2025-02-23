import { FaChartLine, FaClock, FaListUl, FaVideo } from "react-icons/fa";
import React from "react";

function CourseDetail({course}) {
  const DetailCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white border border-[#E6D5C3] rounded-xl p-6 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="bg-[#FAF3ED] p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#C8A087]" />
        </div>
        <div>
          <h2 className="text-sm text-[#8B4513]">{label}</h2>
          <h2 className="font-semibold text-lg text-[#614434] mt-1">{value}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <DetailCard
        icon={FaChartLine}
        label="Skill Level"
        value={course?.difficulty}
      />
      
      <DetailCard
        icon={FaClock}
        label="Estimated Time"
        value={course?.courseOutput?.course?.duration}
      />
      
      <DetailCard
        icon={FaListUl}
        label="Number of Chapters"
        value={course?.courseOutput?.course?.number_of_chapters}
      />
      
      <DetailCard
        icon={FaVideo}
        label="Video Content"
        value={course?.addVideo || 'No'}
      />
    </div>
  );
}

export default CourseDetail;
