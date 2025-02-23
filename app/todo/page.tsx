"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { 
  FaCalendarAlt, 
  FaListUl, 
  FaClock, 
  FaMagic, 
  FaGraduationCap,
  FaBookReader,
  FaChalkboardTeacher,
  FaUserGraduate
} from "react-icons/fa";
import { chatSession } from '@/utils/AiModel';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

interface Task {
  date: string;
  task: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
  materials?: string[];
  strategies?: string[];
  assessment?: string[];
  differentiation?: string[];
  lessonObjectives?: string[];
}

const TeacherTaskManager = () => {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);
  const [mountingKey, setMountingKey] = useState<string>("");
  const [category, setCategory] = useState("lesson-planning");
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Timer states
  const [timerMinutes, setTimerMinutes] = useState(25); // Default Pomodoro time
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setSelectedDate(new Date());
    setMountingKey(Math.random().toString(36));
    
    const savedTasks = localStorage.getItem("teacherTasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Error loading tasks:", e);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    if (isClient && tasks.length > 0) {
      localStorage.setItem("teacherTasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  // Update formattedDate when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setFormattedDate(format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerActive) {
      timer = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev === 0) {
            if (timerMinutes === 0) {
              setTimerActive(false);
              return 0;
            }
            return 59;
          }
          return prev - 1;
        });

        setTimerMinutes((prevMinutes) => {
          if (prevMinutes === 0 && timerSeconds === 0) {
            setTimerActive(false);
            return 0;
          }
          return timerSeconds === 0 ? prevMinutes - 1 : prevMinutes;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timerSeconds, timerMinutes]);

  const generateLessonPlan = async (task: Task) => {
    setIsGeneratingAI(true);
    try {
      const prompt = `As an educational expert, create a detailed lesson plan for this teaching task:
Task: ${task.task}
Category: ${task.category}

Please provide a lesson plan with the following components:
1. Learning objectives
2. Required materials
3. Teaching strategies
4. Assessment methods
5. Differentiation strategies

Return the response in this exact JSON format:
{
  "objectives": ["objective 1", "objective 2", "objective 3"],
  "materials": ["material 1", "material 2", "material 3"],
  "strategies": ["strategy 1", "strategy 2", "strategy 3"],
  "assessment": ["method 1", "method 2", "method 3"],
  "differentiation": ["strategy 1", "strategy 2", "strategy 3"]
}`;

      const response = await chatSession.sendMessage(prompt);
      const responseText = await response.response.text();
      
      // Extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      setTasks(tasks.map(t => 
        t.date === task.date && t.task === task.task 
          ? {
              ...t, 
              lessonObjectives: parsedResponse.objectives,
              materials: parsedResponse.materials,
              strategies: parsedResponse.strategies,
              assessment: parsedResponse.assessment,
              differentiation: parsedResponse.differentiation
            }
          : t
      ));
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      // Show error to user
      alert("Failed to generate lesson plan. Please try again.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const addTask = () => {
    if (currentTask.trim() !== "" && formattedDate) {
      const newTask: Task = {
        date: formattedDate,
        task: currentTask,
        category,
        priority,
      };
      setTasks([...tasks, newTask]);
      setCurrentTask("");
    }
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = formattedDate
    ? tasks.filter((task) => task.date === formattedDate)
    : [];

  if (!isClient || !mountingKey) {
    return <div className="min-h-screen bg-[#FDF8F3] p-5">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaChalkboardTeacher className="w-8 h-8 text-[#C8A087]" />
          <h1 className="text-3xl font-bold text-[#614434]">Teacher's Planning Hub</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar and Task Input Section */}
          <Card className="lg:col-span-2 p-6 border-[#E6D5C3]">
            <div className="flex items-center gap-2 mb-4">
              <FaCalendarAlt className="text-[#C8A087]" />
              <h2 className="text-xl font-semibold text-[#614434]">Lesson Planning Calendar</h2>
            </div>
            
            <Calendar
              onChange={(value) => {
                if (value instanceof Date) setSelectedDate(value);
              }}
              value={selectedDate}
              className="custom-calendar border-[#E6D5C3]"
            />

            <div className="mt-6 space-y-4">
              <Input
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                placeholder="Enter your teaching task..."
                className="border-[#E6D5C3]"
              />
              
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 border border-[#E6D5C3] rounded-md px-3 py-2"
                >
                  <option value="lesson-planning">Lesson Planning</option>
                  <option value="assessment">Assessment</option>
                  <option value="student-feedback">Student Feedback</option>
                  <option value="parent-communication">Parent Communication</option>
                  <option value="professional-development">Professional Development</option>
                  <option value="curriculum-design">Curriculum Design</option>
                </select>
                
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="border border-[#E6D5C3] rounded-md px-3 py-2"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <Button 
                onClick={addTask}
                className="w-full bg-[#C8A087] hover:bg-[#B38B6D] text-white h-12"
              >
                Add Teaching Task
              </Button>
            </div>

            {/* Task List */}
            <div className="mt-6 space-y-4">
              {filteredTasks.map((task, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-[#E6D5C3]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#614434]">{task.task}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => generateLessonPlan(task)}
                        className="bg-[#FAF3ED] text-[#C8A087] hover:bg-[#F5E6D8]"
                        disabled={isGeneratingAI}
                      >
                        {isGeneratingAI ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <FaMagic className="w-4 h-4" />
                        )}
                        <span className="ml-2">Generate Plan</span>
                      </Button>
                      <Button
                        onClick={() => deleteTask(index)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {task.lessonObjectives && (
                    <div className="mt-3 space-y-4">
                      <div className="p-4 bg-[#FAF3ED] rounded-lg">
                        <h4 className="font-medium text-[#614434] mb-2">Learning Objectives:</h4>
                        <ul className="space-y-1">
                          {task.lessonObjectives.map((objective, i) => (
                            <li key={i} className="text-sm text-[#8B4513] flex items-center gap-2">
                              <FaBookReader className="w-4 h-4 text-[#C8A087]" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {task.materials && (
                        <div className="p-4 bg-[#FAF3ED] rounded-lg">
                          <h4 className="font-medium text-[#614434] mb-2">Required Materials:</h4>
                          <ul className="space-y-1">
                            {task.materials.map((material, i) => (
                              <li key={i} className="text-sm text-[#8B4513] flex items-center gap-2">
                                <FaGraduationCap className="w-4 h-4 text-[#C8A087]" />
                                {material}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {task.strategies && (
                        <div className="p-4 bg-[#FAF3ED] rounded-lg">
                          <h4 className="font-medium text-[#614434] mb-2">Teaching Strategies:</h4>
                          <ul className="space-y-1">
                            {task.strategies.map((strategy, i) => (
                              <li key={i} className="text-sm text-[#8B4513] flex items-center gap-2">
                                <FaChalkboardTeacher className="w-4 h-4 text-[#C8A087]" />
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {task.assessment && (
                        <div className="p-4 bg-[#FAF3ED] rounded-lg">
                          <h4 className="font-medium text-[#614434] mb-2">Assessment Methods:</h4>
                          <ul className="space-y-1">
                            {task.assessment.map((method, i) => (
                              <li key={i} className="text-sm text-[#8B4513] flex items-center gap-2">
                                <FaListUl className="w-4 h-4 text-[#C8A087]" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {task.differentiation && (
                        <div className="p-4 bg-[#FAF3ED] rounded-lg">
                          <h4 className="font-medium text-[#614434] mb-2">Differentiation Strategies:</h4>
                          <ul className="space-y-1">
                            {task.differentiation.map((strategy, i) => (
                              <li key={i} className="text-sm text-[#8B4513] flex items-center gap-2">
                                <FaUserGraduate className="w-4 h-4 text-[#C8A087]" />
                                {strategy}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Teaching Stats and Timer */}
          <Card className="p-6 border-[#E6D5C3] space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#614434] mb-3 flex items-center gap-2">
                  <FaUserGraduate className="w-5 h-5 text-[#C8A087]" />
                  Teaching Progress
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FAF3ED] p-4 rounded-lg">
                    <p className="text-sm text-[#8B4513]">Tasks Completed</p>
                    <p className="text-2xl font-bold text-[#C8A087]">
                      {tasks.filter(t => t.completed).length}/{tasks.length}
                    </p>
                  </div>
                  <div className="bg-[#FAF3ED] p-4 rounded-lg">
                    <p className="text-sm text-[#8B4513]">Priority Tasks</p>
                    <p className="text-2xl font-bold text-[#C8A087]">
                      {tasks.filter(t => t.priority === 'high').length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Focus Timer */}
              <div>
                <h3 className="text-lg font-semibold text-[#614434] mb-3 flex items-center gap-2">
                  <FaClock className="w-5 h-5 text-[#C8A087]" />
                  Focus Timer
                </h3>
                <div className="bg-white p-4 rounded-lg border border-[#E6D5C3]">
                  <div className="text-center text-4xl font-bold text-[#614434] mb-4">
                    {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => setTimerActive(true)}
                      className="bg-[#C8A087] hover:bg-[#B38B6D]"
                      disabled={timerActive}
                    >
                      Start
                    </Button>
                    <Button
                      onClick={() => setTimerActive(false)}
                      className="bg-red-500 hover:bg-red-600"
                      disabled={!timerActive}
                    >
                      Pause
                    </Button>
                    <Button
                      onClick={() => {
                        setTimerMinutes(25);
                        setTimerSeconds(0);
                        setTimerActive(false);
                      }}
                      className="bg-[#FAF3ED] text-[#C8A087] hover:bg-[#F5E6D8]"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherTaskManager;


