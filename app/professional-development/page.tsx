"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaStar,
  FaClock,
  FaBookOpen,
  FaTrophy,
  FaLightbulb,
  FaCheckCircle,
  FaRegClock,
  FaChartPie,
  FaChartLine,
  FaGraduationCap,
  FaUserGraduate,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ProfessionalDevelopmentDashboard = () => {
  const skillsData = [
    { name: "Pedagogical Methods", value: 75, description: "Teaching strategies and methodologies" },
    { name: "Technology Integration", value: 65, description: "Digital tools and online learning" },
    { name: "Student Assessment", value: 85, description: "Evaluation and feedback methods" },
    { name: "Classroom Management", value: 70, description: "Behavior and environment control" },
  ];

  const progressData = [
    { month: "Jan", progress: 65, courses: 2 },
    { month: "Feb", progress: 75, courses: 3 },
    { month: "Mar", progress: 85, courses: 4 },
    { month: "Apr", progress: 80, courses: 3 },
    { month: "May", progress: 90, courses: 5 },
  ];

  const COLORS = ["#C8A087", "#E6D5C3", "#8B4513", "#614434"];

  const upcomingDeadlines = [
    {
      title: "Complete UDL Implementation",
      date: "June 15, 2024",
      priority: "High",
    },
    {
      title: "Technology Workshop",
      date: "June 20, 2024",
      priority: "Medium",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section with Quick Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E6D5C3]">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#614434] mb-2">Welcome Back, Teacher!</h1>
            <p className="text-[#8B4513] mb-4">Your professional development journey is progressing well!</p>
            <div className="flex gap-4">
              <div className="text-sm">
                <span className="text-[#C8A087]">Next Deadline:</span>
                <span className="ml-2 text-[#614434] font-medium">June 15, 2024</span>
              </div>
              <div className="text-sm">
                <span className="text-[#C8A087]">Current Focus:</span>
                <span className="ml-2 text-[#614434] font-medium">UDL Implementation</span>
              </div>
            </div>
          </div>
          <Button className="bg-[#C8A087] hover:bg-[#B38B6D]">
            View Development Plan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FAF3ED] rounded-lg">
              <FaBookOpen className="w-6 h-6 text-[#C8A087]" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513]">Completed Courses</p>
              <p className="text-2xl font-bold text-[#614434]">12</p>
              <p className="text-xs text-[#8B4513] mt-1">+3 from last month</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FAF3ED] rounded-lg">
              <FaTrophy className="w-6 h-6 text-[#C8A087]" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513]">Certifications</p>
              <p className="text-2xl font-bold text-[#614434]">3</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FAF3ED] rounded-lg">
              <FaClock className="w-6 h-6 text-[#C8A087]" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513]">Learning Hours</p>
              <p className="text-2xl font-bold text-[#614434]">48</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FAF3ED] rounded-lg">
              <FaStar className="w-6 h-6 text-[#C8A087]" />
            </div>
            <div>
              <p className="text-sm text-[#8B4513]">Achievement Score</p>
              <p className="text-2xl font-bold text-[#614434]">92%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Skills and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#614434]">Skills Distribution</h3>
            <div className="p-2 bg-[#FAF3ED] rounded-lg">
              <FaChartPie className="w-5 h-5 text-[#C8A087]" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-[#E6D5C3]">
                          <p className="font-medium text-[#614434]">{data.name}</p>
                          <p className="text-[#8B4513]">{data.value}% Proficiency</p>
                          <p className="text-sm text-[#8B4513] mt-1">{data.description}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#614434]">Learning Progress</h3>
            <div className="p-2 bg-[#FAF3ED] rounded-lg">
              <FaChartLine className="w-5 h-5 text-[#C8A087]" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E6D5C3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-[#E6D5C3]">
                          <p className="font-medium text-[#614434]">{label}</p>
                          <p className="text-[#8B4513]">Progress: {payload[0].value}%</p>
                          <p className="text-[#8B4513]">Courses: {payload[0].payload.courses}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="progress" fill="#C8A087" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Upcoming Deadlines and AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#614434]">Upcoming Deadlines</h3>
            <Button variant="outline" className="text-[#C8A087] border-[#C8A087]">
              View Calendar
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#FAF3ED] rounded-lg">
                <div className="flex items-center gap-3">
                  <FaClock className="w-5 h-5 text-[#C8A087]" />
                  <div>
                    <p className="font-medium text-[#614434]">{deadline.title}</p>
                    <p className="text-sm text-[#8B4513]">Due: {deadline.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  deadline.priority === "High" ? "bg-[#FFE5E5] text-[#FF4444]" : "bg-[#E6D5C3] text-[#8B4513]"
                }`}>
                  {deadline.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white border-[#E6D5C3]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#614434]">AI Learning Recommendations</h3>
            <FaLightbulb className="w-5 h-5 text-[#C8A087]" />
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Advanced Assessment Techniques",
                description: "Enhance your evaluation methods",
                relevance: "Matches your current focus area",
                duration: "4 weeks",
              },
              {
                title: "Technology Integration Workshop",
                description: "Learn latest EdTech tools",
                relevance: "Recommended for skill growth",
                duration: "2 weeks",
              },
            ].map((rec, index) => (
              <div key={index} className="p-4 bg-[#FAF3ED] rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-[#614434]">{rec.title}</p>
                  <span className="text-sm text-[#C8A087]">{rec.duration}</span>
                </div>
                <p className="text-sm text-[#8B4513] mb-2">{rec.description}</p>
                <p className="text-xs text-[#C8A087]">{rec.relevance}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDevelopmentDashboard;