// // types/pdf-parse.d.ts
// declare module 'pdf-parse' {
//     interface PDFData {
//       text: string;
//       numpages: number;
//       info: any;
//       metadata: any;
//       version: string;
//     }
  
//     function PDFParse(dataBuffer: Buffer): Promise<PDFData>;
//     export = PDFParse;
//   }

declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: {
      PDFFormatVersion: string;
      IsAcroFormPresent: boolean;
      IsXFAPresent: boolean;
      [key: string]: any;
    };
    metadata: any;
    version: string;
  }

  function PDFParse(dataBuffer: Buffer, options?: {
    pagerender?: (pageData: any) => string;
    max?: number;
    version?: string;
  }): Promise<PDFData>;

  export default PDFParse;
}