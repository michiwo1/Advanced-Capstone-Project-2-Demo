import pdfParse from 'pdf-parse/lib/pdf-parse.js'

interface PDFPageData {
  getTextContent: () => string;
}

interface PDFOptions {
  max?: number;
  version?: string;
  render_page?: (pageData: PDFPageData) => string;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const data = await pdfParse(buffer, {
      max: 0,
      version: 'v2.0.550',
      render_page: (pageData: PDFPageData) => pageData.getTextContent()
    } as PDFOptions)
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('No text content found in PDF')
    }
    
    return data.text.trim()
  } catch (error) {
    console.error('PDF parsing error:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`)
    }
    throw new Error('Failed to extract text from PDF')
  }
} 