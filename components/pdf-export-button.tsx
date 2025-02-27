'use client'

import html2pdf from 'html2pdf.js/dist/html2pdf.min'

interface PDFExportButtonProps {
  targetId: string  // ID of the element to export
  filename?: string // Optional custom filename for the exported PDF
}

export default function PDFExportButton({ targetId, filename = 'resume.pdf' }: PDFExportButtonProps) {
  const handleExport = () => {
    const element = document.getElementById(targetId)
    if (element) {
      const options = {
        margin: 20,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      
      html2pdf().set(options).from(element).save()
    }
  }

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm"
    >
      <span>Export PDF</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  )
} 