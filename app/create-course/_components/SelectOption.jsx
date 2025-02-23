import React, { useContext, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { UserInputContext } from '@/app/_context/UserInputContext';
import { FaChartLine, FaClock, FaVideo, FaBookOpen } from 'react-icons/fa';

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedAddVideo, setSelectedAddVideo] = useState('');
  const [numChapters, setNumChapters] = useState(1);

  const difficultyLevels = [
    { id: 1, name: 'Beginner' },
    { id: 2, name: 'Intermediate' },
    { id: 3, name: 'Advanced' },
  ];

  const durationOptions = [
    { id: 1, name: '2-3 hours' },
    { id: 2, name: '4-6 hours' },
    { id: 3, name: '7+ hours' },
  ];

  const videoOptions = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' },
  ];

  const handleInputChange = (field, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const SelectWrapper = ({ label, icon: Icon, children }) => (
    <div className="flex flex-col space-y-2">
      <label className="flex items-center gap-2 text-[#614434] font-medium">
        <Icon className="w-5 h-5 text-[#C8A087]" />
        {label}
      </label>
      {children}
    </div>
  );

  const SelectTrigger = ({ value, placeholder }) => (
    <Select.Trigger className="inline-flex items-center px-4 py-2 border border-[#E6D5C3] rounded-lg bg-white text-[#614434] hover:border-[#C8A087] focus:outline-none focus:ring-2 focus:ring-[#C8A087] focus:ring-opacity-50">
      {value || placeholder}
    </Select.Trigger>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SelectWrapper label="Course Difficulty Level" icon={FaChartLine}>
        <Select.Root
          value={selectedDifficulty}
          onValueChange={(value) => {
            setSelectedDifficulty(value);
            handleInputChange('difficulty', difficultyLevels.find(d => d.id.toString() === value)?.name);
          }}
        >
          <SelectTrigger value={difficultyLevels.find(d => d.id.toString() === selectedDifficulty)?.name} placeholder="Select difficulty" />
          <Select.Content className="bg-white rounded-lg shadow-lg border border-[#E6D5C3] overflow-hidden">
            {difficultyLevels.map((level) => (
              <Select.Item
                key={level.id}
                value={level.id.toString()}
                className="px-4 py-2 text-[#614434] hover:bg-[#FAF3ED] cursor-pointer outline-none"
              >
                {level.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </SelectWrapper>

      <SelectWrapper label="Estimated Duration" icon={FaClock}>
        <Select.Root
          value={selectedDuration}
          onValueChange={(value) => {
            setSelectedDuration(value);
            handleInputChange('duration', durationOptions.find(d => d.id.toString() === value)?.name);
          }}
        >
          <SelectTrigger value={durationOptions.find(d => d.id.toString() === selectedDuration)?.name} placeholder="Select duration" />
          <Select.Content className="bg-white rounded-lg shadow-lg border border-[#E6D5C3] overflow-hidden">
            {durationOptions.map((option) => (
              <Select.Item
                key={option.id}
                value={option.id.toString()}
                className="px-4 py-2 text-[#614434] hover:bg-[#FAF3ED] cursor-pointer outline-none"
              >
                {option.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </SelectWrapper>

      <SelectWrapper label="Include Video Content" icon={FaVideo}>
        <Select.Root
          value={selectedAddVideo}
          onValueChange={(value) => {
            setSelectedAddVideo(value);
            handleInputChange('addVideo', videoOptions.find(v => v.id.toString() === value)?.name);
          }}
        >
          <SelectTrigger value={videoOptions.find(v => v.id.toString() === selectedAddVideo)?.name} placeholder="Select yes/no" />
          <Select.Content className="bg-white rounded-lg shadow-lg border border-[#E6D5C3] overflow-hidden">
            {videoOptions.map((option) => (
              <Select.Item
                key={option.id}
                value={option.id.toString()}
                className="px-4 py-2 text-[#614434] hover:bg-[#FAF3ED] cursor-pointer outline-none"
              >
                {option.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </SelectWrapper>

      <SelectWrapper label="Number of Chapters" icon={FaBookOpen}>
        <input
          type="number"
          value={numChapters}
          onChange={(e) => {
            setNumChapters(e.target.value);
            handleInputChange('numofChapters', e.target.value);
          }}
          min="1"
          max="20"
          className="px-4 py-2 border border-[#E6D5C3] rounded-lg bg-white text-[#614434] hover:border-[#C8A087] focus:outline-none focus:ring-2 focus:ring-[#C8A087] focus:ring-opacity-50"
        />
      </SelectWrapper>
    </div>
  );
}

export default SelectOption;
