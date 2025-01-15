declare module 'pdf-parse/lib/pdf-parse.js' {
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
  }

  function pdfParse(dataBuffer: Buffer, options?: PDFOptions & {
    render_page?: (pageData: PDFPageData) => string;
  }): Promise<PDFData>;
  export default pdfParse;
}

declare module 'pdf-parse' {
  export * from 'pdf-parse/lib/pdf-parse.js';
  export { default } from 'pdf-parse/lib/pdf-parse.js';
} 