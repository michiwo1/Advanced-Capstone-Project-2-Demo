declare module 'html2pdf.js/dist/html2pdf.min' {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
  }

  interface Html2Pdf {
    set: (options: Html2PdfOptions) => Html2Pdf;
    from: (element: HTMLElement) => Html2Pdf;
    save: () => Promise<void>;
  }

  const html2pdf: {
    default: () => Html2Pdf;
  };

  export = html2pdf;
} 