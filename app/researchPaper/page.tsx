"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AiModel";
import TextToSpeech from "@/components/TextToSpeech";
import axios from "axios";
import { FaFileUpload, FaBookReader, FaGraduationCap, FaLightbulb, FaSearch } from "react-icons/fa";
import { Loader } from "lucide-react";

interface ResearchPaperResult {
  Summary: string;
  TeachingImplications: string[];
  PedagogicalAnalysis: string;
  LearningTopics: string[];
}

const ResearchPaperAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [papers, setPapers] = useState<{ title: string | null; summary: string | null; link: string | null }[]>([]);
  const [result, setResult] = useState<ResearchPaperResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Extract text from uploaded file
  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await fetch("/api/extractPdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process the file");
    }

    const data = await response.json();
    return data.text;
  };

  // Analyze research paper and extract key topics
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload an educational research paper");
      return;
    }

    setLoading(true);
    try {
      const paperText = await extractTextFromFile(file);

      const prompt = `As an educational researcher, analyze this paper focusing on teaching and learning implications. Return in JSON format:
      {
        "Summary": "concise summary focusing on educational aspects",
        "TeachingImplications": ["key implications for teaching practice"],
        "PedagogicalAnalysis": "detailed analysis of teaching methodologies and approaches",
        "LearningTopics": ["3-5 key educational topics for further research"]
      }
      Paper Text: ${paperText}`;

      const response = await chatSession.sendMessage(prompt);
      const resultText = await response.response.text();
      const parsedResult = JSON.parse(resultText.match(/\{[\s\S]*\}/)?.[0] || "{}");
      setResult(parsedResult);
      fetchResearchPapers(parsedResult.LearningTopics);
    } catch (error) {
      console.error("Error:", error);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch research papers from arXiv based on extracted topics
  const fetchResearchPapers = async (topics: string[]) => {
    if (topics.length === 0) {
      alert("No topics found for search.");
      return;
    }

    setFetching(true);
    try {
      const query = topics.slice(0, 3).join(" OR "); // Use the top 3 topics for search
      const response = await axios.get(
        `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=5`
      );

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const entries = xmlDoc.getElementsByTagName("entry");

      const fetchedPapers = Array.from(entries).map((entry) => ({
        title: entry.getElementsByTagName("title")[0].textContent,
        summary: entry.getElementsByTagName("summary")[0].textContent,
        link: entry.getElementsByTagName("id")[0].textContent,
      }));

      setPapers(fetchedPapers);
    } catch (error) {
      console.error("Error fetching research papers:", error);
      alert("Failed to fetch related research papers.");
    } finally {
      setFetching(false);
    }
  };

  // Combine all text for speech
  const getCombinedText = () => {
    if (!result) return "";
    return `Summary: ${result.Summary}. 
            Teaching Implications: ${result.TeachingImplications.join(". ")}. 
            Pedagogical Analysis: ${result.PedagogicalAnalysis}`;
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3] py-8 px-4">
      <Card className="max-w-4xl mx-auto border border-[#E6D5C3] shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-white border-b border-[#E6D5C3] p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaGraduationCap className="w-8 h-8 text-[#C8A087]" />
            <CardTitle className="text-2xl font-bold text-[#614434]">
              Teaching Research Analyzer
            </CardTitle>
          </div>
          <p className="text-center text-[#8B4513]">
            Analyze educational research papers to enhance your teaching practice
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#E6D5C3]">
            <label className="block text-[#614434] font-medium mb-2">
              Upload Educational Research Paper
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                    file:text-sm file:font-medium file:bg-[#FAF3ED] file:text-[#C8A087]
                    hover:file:bg-[#C8A087] hover:file:text-white"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#C8A087] hover:bg-[#B38B6D] text-white flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    <span>Analyze Paper</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-[#E6D5C3]">
                <div className="flex items-center gap-2 mb-4 text-[#C8A087]">
                  <FaBookReader className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Educational Summary</h3>
                </div>
                <p className="text-[#614434]">{result.Summary}</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E6D5C3]">
                <div className="flex items-center gap-2 mb-4 text-[#C8A087]">
                  <FaLightbulb className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Teaching Implications</h3>
                </div>
                <ul className="space-y-2">
                  {result.TeachingImplications.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#614434]">
                      <span className="text-[#C8A087]">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E6D5C3]">
                <div className="flex items-center gap-2 mb-4 text-[#C8A087]">
                  <FaGraduationCap className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Pedagogical Analysis</h3>
                </div>
                <p className="text-[#614434] whitespace-pre-line">{result.PedagogicalAnalysis}</p>
              </div>

              <TextToSpeech text={getCombinedText()} />
            </div>
          )}

          {papers.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-[#E6D5C3]">
              <h3 className="text-lg font-semibold text-[#614434] mb-4">Related Educational Research</h3>
              <div className="space-y-4">
                {papers.map((paper, index) => (
                  <div key={index} className="p-4 bg-[#FAF3ED] rounded-lg">
                    <a
                      href={paper.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8A087] hover:text-[#B38B6D] font-semibold block mb-2"
                    >
                      {paper.title}
                    </a>
                    <p className="text-[#614434] text-sm">{paper.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchPaperAnalyzer;
