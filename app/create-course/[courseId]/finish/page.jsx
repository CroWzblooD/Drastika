"use client";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { CourseList } from "@/utils/schema";
import { eq, and } from "drizzle-orm";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { FaCheckCircle, FaLink, FaCopy } from "react-icons/fa";

function FinishScreen({ params }) {
  const { user } = useUser();
  const unwrappedParams = use(params);
  const [course, setCourse] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (unwrappedParams && user?.primaryEmailAddress?.emailAddress) {
      GetCourse();
    }
  }, [unwrappedParams, user]);

  const GetCourse = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, unwrappedParams?.courseId),
            eq(CourseList?.createdBy, user.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0] || {});
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C8A087] rounded-full mb-6">
            <FaCheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#614434]">
            Congratulations! Your Course is Ready
          </h2>
          <p className="text-[#8B4513] mt-3">
            Your AI-powered learning path has been generated successfully
          </p>
        </div>

        <CourseBasicInfo course={course} />

        <div className="mt-8 bg-white rounded-xl border border-[#E6D5C3] p-6">
          <div className="flex items-center gap-2 mb-3">
            <FaLink className="w-5 h-5 text-[#C8A087]" />
            <h3 className="font-medium text-[#614434]">Course URL</h3>
          </div>
          <div className="flex items-center gap-4 bg-[#FAF3ED] p-4 rounded-lg">
            <span className="text-[#8B4513] flex-grow overflow-x-auto">
              {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E6D5C3] text-[#614434] hover:bg-[#FDF8F3] transition-all"
            >
              {copied ? (
                <>
                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <FaCopy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishScreen;
