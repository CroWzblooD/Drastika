'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { TimelineDemo } from "@/components/timline";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { FaLightbulb, FaChartLine, FaGraduationCap } from "react-icons/fa";

export default function Home() {
  const {user} = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser =async()=>{
    const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imgUrl:user?.imageUrl,
      userName:user?.fullName
    })

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F3] via-[#FAF3ED] to-[#F5E6D3]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGraduationCap className="w-12 h-12 text-[#C8A087]" />
            <h1 className="text-5xl md:text-7xl font-bold gradient-text from-[#C8A087] via-[#8B4513] to-[#614434]">
              Drastika
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#614434] max-w-3xl mx-auto leading-relaxed">
            Revolutionizing teacher development through AI-powered insights and personalized growth pathways
          </p>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaLightbulb className="w-8 h-8 text-[#C8A087]" />
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-[#614434] mb-2">AI-Driven Insights</h3>
              <p className="text-[#8B4513]">Personalized feedback and actionable recommendations for professional growth</p>
            </div>
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaChartLine className="w-8 h-8 text-[#C8A087]" />
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-[#614434] mb-2">Progress Tracking</h3>
              <p className="text-[#8B4513]">Real-time monitoring of implementation success and skill development</p>
            </div>
            <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaGraduationCap className="w-8 h-8 text-[#C8A087]" />
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-[#614434] mb-2">Adaptive Learning</h3>
              <p className="text-[#8B4513]">Customized development paths that evolve with your teaching journey</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button className="bg-[#C8A087] hover:bg-[#B38B6D] text-white px-8 py-3 rounded-lg text-lg transform hover:scale-105 transition-all">
              Start Your Journey
            </Button>
            <Button className="bg-white text-[#614434] border border-[#C8A087] hover:bg-[#FDF8F3] px-8 py-3 rounded-lg text-lg transform hover:scale-105 transition-all">
              Explore Features
            </Button>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="py-12">
          <TimelineDemo />
        </div>

        {/* User Button */}
        <div className="fixed top-4 right-4 z-50">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
