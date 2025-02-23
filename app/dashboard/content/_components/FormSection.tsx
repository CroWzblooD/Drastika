'use client';

import React, { useState } from 'react';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { 
  FaBookOpen, 
  FaClipboardCheck, 
  FaComments, 
  FaUserFriends, 
  FaEnvelope, 
  FaPuzzlePiece, 
  FaBullseye, 
  FaStar, 
  FaRocket 
} from 'react-icons/fa';

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

const iconMap: { [key: string]: React.ElementType } = {
  'generate-lesson-plan': FaBookOpen,
  'create-assessment': FaClipboardCheck,
  'generate-feedback': FaComments,
  'plan-differentiation': FaUserFriends,
  'parent-communication': FaEnvelope,
  'design-activity': FaPuzzlePiece,
  'write-iep-goals': FaBullseye,
  'behavior-plan': FaStar,
  'design-pbl': FaRocket,
};

const emojiMap: { [key: string]: string } = {
  'generate-lesson-plan': '📚',
  'create-assessment': '📝',
  'generate-feedback': '💭',
  'plan-differentiation': '🎯',
  'parent-communication': '✉️',
  'design-activity': '🎮',
  'write-iep-goals': '🎯',
  'behavior-plan': '🌟',
  'design-pbl': '🚀',
};

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<any>({});
  const Icon = selectedTemplate?.slug ? iconMap[selectedTemplate.slug] : FaBookOpen;
  const emoji = selectedTemplate?.slug ? emojiMap[selectedTemplate.slug] : '📚';

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className='bg-white rounded-xl border border-[#E6D5C3] p-6'>
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-[#FAF3ED] rounded-lg w-12 h-12 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#C8A087]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className='font-semibold text-xl text-[#614434]'>
              {selectedTemplate?.name}
            </h2>
            <span className="text-2xl">{emoji}</span>
          </div>
          <p className='text-[#8B4513]'>{selectedTemplate?.desc}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className='space-y-6'>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className='space-y-2'>
            <label className='block text-sm font-medium text-[#614434]'>
              {item.label}
            </label>
            {item.field === 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087]"
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
            ) : item.field === 'textarea' ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087] min-h-[120px]"
                placeholder={`Enter ${item.label.toLowerCase()}`}
              />
            ) : null}
          </div>
        ))}
        <Button 
          className='w-full bg-[#C8A087] hover:bg-[#B38B6D] text-white h-12 flex items-center justify-center gap-2' 
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className='w-5 h-5 animate-spin' />
              <span>Generating Content...</span>
            </>
          ) : (
            <>
              <Icon className="w-5 h-5" />
              <span>Generate Teaching Content</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
