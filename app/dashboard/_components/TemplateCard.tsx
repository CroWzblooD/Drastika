import React from 'react';
import { TEMPLATE } from './TemplateListSection';
import Link from 'next/link';
import { 
  FaBookOpen, // Lesson Plan
  FaClipboardCheck, // Assessment
  FaComments, // Feedback
  FaUserFriends, // Differentiation
  FaEnvelope, // Communication
  FaPuzzlePiece, // Activity
  FaBullseye, // IEP
  FaStar, // Behavior
  FaRocket // Project
} from 'react-icons/fa';

const iconMap: { [key: string]: React.ElementType } = {
  'generate-lesson-plan': FaBookOpen,
  'create-assessment': FaClipboardCheck,
  'generate-feedback': FaComments,
  'plan-differentiation': FaUserFriends,
  'parent-communication': FaEnvelope,
  'design-activity': FaPuzzlePiece,
  'write-iep-goals': FaBullseye,
  'behavior-plan': FaStar,
  'design-pbl': FaRocket,
};

const TemplateCard = (item: TEMPLATE) => {
  const Icon = iconMap[item.slug] || FaBookOpen;

  return (
    <Link href={'/dashboard/content/'+item.slug}>
      <div className="p-6 h-[200px] rounded-xl border border-[#E6D5C3] bg-white hover:shadow-lg transition-all duration-300 hover:border-[#C8A087] group flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#FAF3ED] rounded-lg w-12 h-12 flex items-center justify-center group-hover:bg-[#F5E6D8]">
            <Icon className="w-6 h-6 text-[#C8A087] group-hover:text-[#B38B6D]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg text-[#614434]">{item.name}</h2>
              <span className="text-2xl">{item.emoji}</span>
            </div>
            <p className="text-[#8B4513] line-clamp-2 text-sm mt-2">{item.desc}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-xs font-medium px-3 py-1 bg-[#FAF3ED] text-[#C8A087] rounded-full">
            {item.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TemplateCard;
