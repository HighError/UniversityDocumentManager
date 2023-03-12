import { promises as fs } from 'fs';
import { TemplateHandler } from 'easy-template-x';
import path from 'path';

export default async function GenerateDocx(data: any) {
  const docxFile = path.join(process.cwd(), 'src/lib/template.docx');
  const templateFile = await fs.readFile(docxFile);
  const handler = new TemplateHandler();
  const doc = await handler.process(templateFile, data);
  return doc;
}
