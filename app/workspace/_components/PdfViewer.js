import React from 'react'

function PdfViewer({fileUrl}) {
  return (
    <div className="h-[calc(100vh-64px)] bg-[#FAF3ED] border-l border-[#E6D5C3]">
      <iframe 
        src={fileUrl + "#toolbar=0"} 
        className="w-full h-full rounded-lg"
        title="PDF Viewer"
      />
    </div>
  )
}

export default PdfViewer