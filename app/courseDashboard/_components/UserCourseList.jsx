"use client";
import { db } from "@/utils/db";
import { CourseList } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from '../_components/CourseCard'
import { FaBookReader } from 'react-icons/fa';

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress));

    setCourseList(result);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <FaBookReader className="w-6 h-6 text-[#C8A087]" />
        <h2 className="text-2xl font-bold text-[#614434]">My Learning Paths</h2>
      </div>
      
      {courseList.length === 0 ? (
        <div className="text-center py-10 bg-[#FAF3ED] rounded-xl border border-[#E6D5C3]">
          <p className="text-[#8B4513]">No courses created yet. Start by creating your first AI-powered learning path!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCourseList;
