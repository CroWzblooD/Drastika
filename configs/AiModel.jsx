const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
  
  const generationConfig = {
    temperature: 0.9,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 //model to make a call
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course tutorial on following detail with field, as course name, description, along with chapter name, about, duration: category: programming, topic: python, level: basic, duration: 1 hours, number of chapters: 5, in Json format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"course_name\": \"Python Basics: A Beginner's Journey\",\n    \"description\": \"This course provides a fundamental introduction to Python programming, covering essential concepts and syntax for beginners. You'll learn how to write simple programs, work with data, and understand basic control flow.\",\n    \"category\": \"programming\",\n     \"topic\": \"python\",\n     \"level\": \"basic\",\n    \"duration\": \"1 hour\",\n    \"number_of_chapters\": 5,\n    \"chapters\": [\n      {\n        \"chapter_name\": \"Introduction to Python\",\n        \"about\": \"Welcome to the world of Python! This chapter will introduce you to what Python is, why it's popular, and how to set up your development environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapter_name\": \"Variables and Data Types\",\n        \"about\": \"Learn about different data types in Python, such as integers, floats, strings, and booleans. You'll also discover how to declare and use variables to store data.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapter_name\": \"Basic Input and Output\",\n        \"about\": \"Understand how to take input from the user and display output on the screen using Python's built-in functions like 'print()' and 'input()'.\",\n        \"duration\": \"10 minutes\"\n      },\n        {\n        \"chapter_name\": \"Operators and Expressions\",\n          \"about\": \"Explore arithmetic, comparison, and logical operators in Python. Learn how to form expressions and evaluate them to perform calculations and make decisions.\",\n          \"duration\": \"10 minutes\"\n      },\n        {\n        \"chapter_name\": \"Control Flow: Conditionals and Loops\",\n        \"about\": \"Dive into conditional statements (if, elif, else) and looping structures (for, while) to control the flow of your Python programs.\",\n        \"duration\": \"20 minutes\"\n      }\n    ]\n  }\n}\n```\n"},
          ],
        },
      ],
    });

// Create a reusable chat session
export const chatSession = model.startChat({
    generationConfig: {
        temperature: 0.9,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192,
    },
});

// Function to generate course layout
export const GenerateChapterContent_AI = async (courseDetails) => {
    try {
        const prompt = `Generate a course tutorial with the following details:
            Category: ${courseDetails.category}
            Topic: ${courseDetails.topic}
            Level: ${courseDetails.difficulty}
            Duration: ${courseDetails.duration}
            Number of Chapters: ${courseDetails.numofChapters}
            Format the response as JSON with course name, description, and chapters array.
            Each chapter should have: chapter_name, about, and duration fields.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
    } catch (error) {
        console.error("Error generating course layout:", error);
        return null;
    }
};

// Function to generate chapter content
export const GenerateChapterContent = async (topic, chapterName) => {
    try {
        const contentPrompt = `Create detailed educational content for a chapter about "${chapterName}" in ${topic}. 
            Include the following in your response:
            1. At least 3 sections with clear explanations
            2. Practical code examples where applicable
            3. Key concepts and their definitions
            Format the response as JSON with sections array containing title, explanation, and code_example fields.`;
        
        const result = await model.generateContent(contentPrompt);
        const content = JSON.parse(result.response.text());

        return {
            content,
            videoId: null
        };
    } catch (error) {
        console.error("Error generating chapter content:", error);
        return null;
    }
};

// Export all functions
export default {
    GenerateChapterContent_AI,
    GenerateChapterContent,
    chatSession
};
  
   
  
  
  