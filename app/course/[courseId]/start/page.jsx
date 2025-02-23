"use client"
import { db } from "@/utils/db";
import { Chapters, CourseList } from "@/utils/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from './_component/ChapterListCard';
import ChapterContent from './_component/ChapterContent';
import { FaBook } from 'react-icons/fa';
import GenerateChapterContent from '@/configs/AiModel';

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState();
  const [loading, setLoading] = useState(true);

  const courseId = React.use(params)?.courseId;

  useEffect(() => {
    if (courseId) {
      GetCourse(courseId);
    }
  }, [courseId]);

  const GetCourse = async (courseId) => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.courseId, courseId));
      
      setCourse(result[0]);
      // Select first chapter by default
      if (result[0]?.courseOutput?.course?.chapters?.length > 0) {
        setSelectedChapter(result[0].courseOutput.course.chapters[0]);
        await GetSelectedChapterContent(0);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetSelectedChapterContent = async (chapterId) => {
    try {
      setLoading(true);
      // First try to get from database
      const result = await db
        .select()
        .from(Chapters)
        .where(and(
          eq(Chapters?.chapterId, chapterId), 
          eq(Chapters?.courseId, course?.courseId)
        ));

      if (result[0]) {
        setChapterContent(result[0]);
      } else {
        // If not in database, generate new content
        const chapter = course?.courseOutput?.course?.chapters[chapterId];
        const content = await GenerateChapterContent(
          course?.courseOutput?.course?.topic,
          chapter?.chapter_name
        );
        
        if (content) {
          setChapterContent(content);
          // Here you might want to save the generated content to your database
        }
      }
    } catch (error) {
      console.error("Error fetching/generating chapter content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FDF8F3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C8A087] border-t-transparent mb-4"></div>
          <p className="text-[#8B4513]">Loading course content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[300px,1fr] h-screen bg-[#FDF8F3]">
      {/* Chapter List Sidebar */}
      <div className="hidden md:block border-r border-[#E6D5C3] bg-white overflow-y-auto">
        <div className="bg-[#FAF3ED] p-4 border-b border-[#E6D5C3]">
          <div className="flex items-center gap-3">
            <FaBook className="w-5 h-5 text-[#C8A087]" />
            <h2 className="font-bold text-[#614434] line-clamp-2">
              {course?.courseOutput?.course?.course_name}
            </h2>
          </div>
        </div>

        <div>
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard 
                chapter={chapter} 
                index={index}
                isSelected={selectedChapter?.chapter_name === chapter?.chapter_name}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Content */}
      <div className="overflow-y-auto">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;

