import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PROPS {
  aiOutput: string;
}

const OutputSection = ({ aiOutput }: PROPS) => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput || 'Your teaching content will appear here...');
    }
  }, [aiOutput]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiOutput);
      toast.success('Content copied to clipboard', {
        icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      });
    } catch (error) {
      toast.error('Failed to copy content');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6D5C3] overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-[#E6D5C3]">
        <h2 className="font-medium text-[#614434]">Generated Content</h2>
        <button 
          onClick={handleCopy}
          className="p-2 hover:bg-[#FAF3ED] rounded-lg transition-colors text-[#C8A087]"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your teaching content will appear here..."
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        theme="white"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'link'],
          ['code', 'codeblock']
        ]}
      />
    </div>
  );
};

export default OutputSection;
