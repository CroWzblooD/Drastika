"use client";
import Templates from '@/app/(data)/Templates';
import React, { useEffect, useState } from 'react';
import TemplateCard from './TemplateCard';
import { FaLightbulb } from 'react-icons/fa';

export interface TEMPLATE {
  name: string;
  desc: string;
  category: string;
  slug: string;
  emoji: string;
  aiprompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

const TemplateListSection = ({ userSearchInput }: any) => {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(Templates.map(t => t.category))];

  useEffect(() => {
    let filtered = Templates;
    
    if (userSearchInput) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase()) ||
        item.desc.toLowerCase().includes(userSearchInput.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setTemplateList(filtered);
  }, [userSearchInput, selectedCategory]);

  return (
    <div className="p-8 bg-[#FDF8F3]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaLightbulb className="w-6 h-6 text-[#C8A087]" />
          <h2 className="text-xl font-semibold text-[#614434]">Teaching Templates</h2>
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-[#C8A087] text-white' 
                  : 'bg-[#FAF3ED] text-[#C8A087] hover:bg-[#F5E6D8]'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateList.map((item: TEMPLATE, index: number) => (
          <TemplateCard {...item} key={index} />
        ))}
      </div>
      
      {templateList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#8B4513]">No templates found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateListSection;
