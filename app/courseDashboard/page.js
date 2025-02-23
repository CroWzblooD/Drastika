import React from "react";
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const CourseDashboard = () => {
  return (
    <div className="space-y-6">
      <AddCourse />
      <UserCourseList />
    </div>
  );
};

export default CourseDashboard;
