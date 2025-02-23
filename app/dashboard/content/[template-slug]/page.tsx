"use client";

import React, { useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { FaChalkboardTeacher } from "react-icons/fa";

const CreateNewContent = () => {
  const params = useParams();
  const templateSlug = params["template-slug"];
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAIOutput] = useState<string>("");
  const { user } = useUser();

  const GenerateAicontent = async (formData: any) => {
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiprompt;
    const FinalAiprompt = `As an educational content creator, please generate content based on:
      ${JSON.stringify(formData)}
      Teaching Context: ${SelectedPrompt}
      Focus on pedagogical approaches and learning outcomes.`;

    try {
      const result = await chatSession.sendMessage(FinalAiprompt);
      const aiResponse = result?.response?.text();
      if (aiResponse) {
        setAIOutput(aiResponse);
        await saveInDb(formData, selectedTemplate?.slug, aiResponse);
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
    setLoading(false);
  };

  const saveInDb = async (formData: any, slug: string | undefined, aiResponse: string) => {
    try {
      await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug || "unknown",
        aiResponse: aiResponse,
        createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().toISOString(),
      });
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <div className="p-6 bg-[#FDF8F3] min-h-screen">
      <div className="mb-6">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-[#C8A087] hover:text-[#B38B6D] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Templates</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <FaChalkboardTeacher className="w-6 h-6 text-[#C8A087]" />
        <h1 className="text-2xl font-semibold text-[#614434]">
          Create Teaching Content
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={GenerateAicontent}
          loading={loading}
        />
        <OutputSection aiOutput={aiOutput} />
      </div>
    </div>
  );
};

export default CreateNewContent;
