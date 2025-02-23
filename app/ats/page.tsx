"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/AiModel';
import { jsPDF } from 'jspdf';
import { FaChalkboardTeacher, FaFileUpload, FaDownload, FaChartBar, FaListUl, FaUserGraduate } from 'react-icons/fa';
import { Loader } from 'lucide-react';

interface ATSResult {
  JDMatch: string;
  MissingKeywords: string[];
  ProfileSummary: string;
  ScoreBreakdown: {
    TeachingExperience: string;
    PedagogicalSkills: string;
    SubjectExpertise: string;
    ProfessionalDevelopment: string;
  };
}

const ATSAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const extractTextFromPDFs = async (files: File[]): Promise<string> => {
    let combinedText = '';
    for (const file of files) {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('/api/extractPdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      combinedText += data.text + '\n';
    }
    return combinedText;
  };

  const handleSubmit = async () => {
    if (files.length === 0 || !jobDescription) {
      alert('Please provide both your teaching resume and the job description');
      return;
    }

    setLoading(true);
    try {
      const resumeText = await extractTextFromPDFs(files);

      const prompt = `You are an expert in educational recruitment and ATS systems, specializing in teacher placement and educational positions. Analyze the provided teaching resume against the job description. Return your analysis in strictly valid JSON format with the following structure:
      {
        "JDMatch": "percentage as string with % symbol",
        "MissingKeywords": ["array of missing important educational keywords"],
        "ProfileSummary": "detailed teaching profile analysis",
        "ScoreBreakdown": {
          "TeachingExperience": "percentage as string with % symbol",
          "PedagogicalSkills": "percentage as string with % symbol",
          "SubjectExpertise": "percentage as string with % symbol",
          "ProfessionalDevelopment": "percentage as string with % symbol"
        }
      }

      Resume text: ${resumeText}
      Job Description: ${jobDescription}`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();
      const parsedResult = JSON.parse(resultText.match(/\{[\s\S]*\}/)[0]);
      setResult(parsedResult);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('An error occurred while analyzing the resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Function to wrap text inside a defined width
    const wrapText = (text: string, x: number, y: number, maxWidth: number) => {
      const wrappedText = doc.splitTextToSize(text, maxWidth);
      doc.text(wrappedText, x, y);
      return y + (wrappedText.length * 10);  // Adjust y position based on the number of lines
    };

    // Add JDMatch Section
    doc.setFontSize(16);
    doc.text('JD Match:', 10, 10);
    doc.setFontSize(12);
    let yPosition = 20;
    yPosition = wrapText(result.JDMatch, 10, yPosition, 180);  // 180 is the maxWidth for wrapping

    // Add Score Breakdown Section
    doc.setFontSize(16);
    doc.text('Score Breakdown:', 10, yPosition);
    doc.setFontSize(12);
    yPosition += 10;

    const scoreBreakdown = result.ScoreBreakdown;
    yPosition = wrapText(`Teaching Experience: ${scoreBreakdown.TeachingExperience}`, 10, yPosition, 180);
    yPosition = wrapText(`Pedagogical Skills: ${scoreBreakdown.PedagogicalSkills}`, 10, yPosition, 180);
    yPosition = wrapText(`Subject Expertise: ${scoreBreakdown.SubjectExpertise}`, 10, yPosition, 180);
    yPosition = wrapText(`Professional Development: ${scoreBreakdown.ProfessionalDevelopment}`, 10, yPosition, 180);

    // Add Missing Keywords Section
    doc.setFontSize(16);
    doc.text('Missing Keywords:', 10, yPosition);
    doc.setFontSize(12);
    yPosition += 10;

    result.MissingKeywords.forEach((keyword, index) => {
      yPosition = wrapText(`${index + 1}. ${keyword}`, 10, yPosition, 180);
    });

    // Add Profile Summary Section
    doc.setFontSize(16);
    doc.text('Profile Summary:', 10, yPosition);
    doc.setFontSize(12);
    yPosition += 10;

    yPosition = wrapText(result.ProfileSummary, 10, yPosition, 180);

    // Save the PDF
    doc.save('ATS_Analysis_Report.pdf');
  };

  return (
    <div className="p-6 bg-[#FDF8F3] min-h-screen">
      <Card className="w-full max-w-4xl mx-auto border-[#E6D5C3]">
        <CardHeader className="border-b border-[#E6D5C3]">
          <div className="flex items-center gap-3 justify-center mb-2">
            <FaChalkboardTeacher className="w-8 h-8 text-[#C8A087]" />
            <CardTitle className="text-2xl font-bold text-[#614434]">Teaching Position Analyzer</CardTitle>
          </div>
          <p className="text-center text-[#8B4513]">Optimize your teaching resume for educational institutions</p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#614434]">Teaching Position Description</label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the teaching position description here..."
              className="h-32 border-[#E6D5C3] focus:border-[#C8A087] focus:ring-[#C8A087]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#614434]">Upload Teaching Resume</label>
            <div className="border-2 border-dashed border-[#E6D5C3] rounded-lg p-4 text-center hover:border-[#C8A087] transition-colors">
              <FaFileUpload className="w-8 h-8 text-[#C8A087] mx-auto mb-2" />
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="w-full"
              />
              <p className="text-sm text-[#8B4513] mt-2">Please upload PDF files</p>
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full bg-[#C8A087] hover:bg-[#B38B6D] text-white h-12"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaChartBar className="w-5 h-5" />
                <span>Analyze Teaching Profile</span>
              </div>
            )}
          </Button>

          {result && (
            <div className="space-y-6 mt-6">
              <div className="bg-white rounded-xl border border-[#E6D5C3] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaUserGraduate className="w-6 h-6 text-[#C8A087]" />
                  <h3 className="text-xl font-semibold text-[#614434]">Teaching Profile Match</h3>
                </div>
                <p className="text-3xl font-bold text-[#C8A087]">{result.JDMatch}</p>
              </div>

              <div className="bg-white rounded-xl border border-[#E6D5C3] p-6">
                <h3 className="text-lg font-semibold text-[#614434] mb-4">Educational Competencies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(result.ScoreBreakdown).map(([key, value]) => (
                    <div key={key} className="p-4 bg-[#FAF3ED] rounded-lg">
                      <p className="text-sm text-[#8B4513]">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-xl font-bold text-[#C8A087]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E6D5C3] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaListUl className="w-6 h-6 text-[#C8A087]" />
                  <h3 className="text-lg font-semibold text-[#614434]">Missing Educational Keywords</h3>
                </div>
                <ul className="space-y-2">
                  {result.MissingKeywords.map((keyword, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#8B4513]">
                      <span className="w-2 h-2 bg-[#C8A087] rounded-full"></span>
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-[#E6D5C3] p-6">
                <h3 className="text-lg font-semibold text-[#614434] mb-4">Teaching Profile Summary</h3>
                <p className="text-[#8B4513] whitespace-pre-line">{result.ProfileSummary}</p>
              </div>

              <Button 
                onClick={downloadReport} 
                className="w-full bg-[#C8A087] hover:bg-[#B38B6D] text-white h-12 flex items-center justify-center gap-2"
              >
                <FaDownload className="w-5 h-5" />
                <span>Download Teaching Profile Analysis</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSAnalyzer;
