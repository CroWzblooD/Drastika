"use client"
import { Button } from "@/components/ui/button";
import { ChartBarStacked, NotebookText, Settings } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectCategory from './_components/SelectCategory'
import TopicDescription from './_components/TopicDescription'
import SelectOption from './_components/SelectOption'
import { UserInputContext } from '@/app/_context/UserInputContext'
import { GenerateCourseLayout_AI } from '@/configs/AiModel'
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import uuid4 from "uuid4"
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const { user } = useUser();
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const StepperOption = [
    { id: 1, name: "Category", icon: ChartBarStacked },
    { id: 2, name: "Topic & Description", icon: NotebookText },
    { id: 3, name: "Options", icon: Settings },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = 'Generate a course tutorial on following detail with field, as course name, description, along with chapter name, about, duration:';
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', topic: ' + userCourseInput?.topic + ', difficulty: ' + userCourseInput?.difficulty + ', duration: ' + userCourseInput?.duration + ', number of chapters: ' + userCourseInput?.numofChapters + ', in JSON format';
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response.text()));
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4();
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      difficulty: userCourseInput?.difficulty,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl
    });
    console.log('finish');

    setLoading(false);
    router.replace('/create-course/' + id);
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="flex flex-col justify-center items-center pt-10 pb-8">
        <h2 className="text-4xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
          Create Your Course
        </h2>
        <p className="text-[#8B4513] mt-2">Design personalized learning experiences with AI assistance</p>
        
        <div className="flex items-center justify-center mt-10">
          {StepperOption.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
                  ${activeIndex >= index 
                    ? 'bg-[#C8A087] text-white' 
                    : 'bg-[#FAF3ED] text-[#8B4513] border border-[#E6D5C3]'}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm mt-2 font-medium text-[#614434]">{item.name}</h3>
              </div>

              {index < StepperOption.length - 1 && (
                <div className={`w-24 h-[2px] mx-4 rounded-full transition-all
                  ${activeIndex > index ? 'bg-[#C8A087]' : 'bg-[#E6D5C3]'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 max-w-6xl mx-auto">
        {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}

        {loading && (
          <div className="fixed inset-0 bg-[#614434]/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/80 p-6 rounded-xl shadow-lg flex items-center gap-4">
              <img src="/loading.gif" alt="Loading..." width={60} height={60} className="rounded-full" />
              <p className="text-[#614434] font-medium">Generating your course...</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10 max-w-md mx-auto">
          <Button 
            disabled={activeIndex === 0} 
            onClick={() => setActiveIndex(activeIndex - 1)}
            className="bg-white border border-[#C8A087] text-[#8B4513] hover:bg-[#FAF3ED]"
          >
            Previous
          </Button>
          
          {activeIndex < 2 ? (
            <Button 
              onClick={() => setActiveIndex((prev) => Math.min(prev + 1, StepperOption.length - 1))}
              className="bg-[#C8A087] hover:bg-[#B38B6D] text-white"
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={GenerateCourseLayout}
              className="bg-[#C8A087] hover:bg-[#B38B6D] text-white"
            >
              Generate Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
