import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from 'react-markdown';
import { FaPlayCircle, FaBookOpen } from 'react-icons/fa';

const ChapterContent = ({ chapter, content }) => {
  const [videoError, setVideoError] = useState(false);
  
  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Add error handling for video
  const handleVideoError = () => {
    console.log("Video failed to load");
    setVideoError(true);
  };

  // Debug logging
  useEffect(() => {
    console.log("Chapter Content:", content);
    console.log("Video ID:", content?.videoId);
  }, [content]);

  // Fallback content when no chapter is selected
  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-full bg-[#FDF8F3]">
        <div className="text-center p-8">
          <FaBookOpen className="w-16 h-16 text-[#C8A087] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#614434]">Select a Chapter</h2>
          <p className="text-[#8B4513] mt-2">Choose a chapter from the sidebar to start learning</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#614434]">{chapter?.chapter_name}</h2>
        <p className="text-[#8B4513] mt-2">{chapter?.about}</p>
      </div>

      {content?.videoId && !videoError && (
        <div className="mb-8 rounded-xl overflow-hidden border border-[#E6D5C3] bg-white">
          <div className="p-4 border-b border-[#E6D5C3] flex items-center gap-2">
            <FaPlayCircle className="text-[#C8A087]" />
            <h3 className="font-medium text-[#614434]">Video Content</h3>
          </div>
          <div className="aspect-video">
            <YouTube 
              videoId={content?.videoId} 
              opts={opts} 
              onError={handleVideoError}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {content?.content?.chapter?.sections?.map((section, index) => (
          <div key={index} className="bg-white border border-[#E6D5C3] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#E6D5C3] bg-[#FAF3ED]">
              <h2 className="font-semibold text-lg text-[#614434]">{section?.title}</h2>
            </div>
            
            <div className="p-6">
              <div className="prose prose-brown max-w-none">
                <ReactMarkdown>{section?.explanation}</ReactMarkdown>
              </div>
              
              {section?.code_example && (
                <div className="mt-4 bg-[#2D2D2D] text-white rounded-lg overflow-hidden">
                  <div className="bg-[#1E1E1E] px-4 py-2 text-sm">Code Example</div>
                  <pre className="p-4 overflow-x-auto">
                    <code>{section?.code_example.replace(/<\/?precode>/g, '')}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
