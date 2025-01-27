import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: `Hello, ${options.name}!`,
        fontSize: 15,
      },
    ],
  };
  return docDefinition;
};
