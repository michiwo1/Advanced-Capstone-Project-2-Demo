declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  }

  interface PDFPageData {
    getTextContent: () => string;
  }

  interface PDFOptions {
    max?: number;
    version?: string;
    pagerender?: (pageData: PDFPageData) => string;
  }

  function pdfParse(dataBuffer: Buffer, options?: PDFOptions): Promise<PDFData>;
  export default pdfParse;
} 