import { promises as fs } from 'fs';
import { TemplateHandler } from 'easy-template-x';
import path from 'path';

export default async function GenerateDocx(data: any) {
  data.hours_day_all =
    data.hours_day_lectures +
    data.hours_day_laboratory +
    data.hours_day_irs +
    data.hours_day_training +
    data.hours_day_srs;

  data.hours_ext_all =
    data.hours_ext_lectures +
    data.hours_ext_laboratory +
    data.hours_ext_irs +
    data.hours_ext_training +
    data.hours_ext_srs;

  data.program_protocol_date_1 = new Date(
    data.program_protocol_date_1
  ).toLocaleDateString('ukr-UA');
  data.program_protocol_date_2 = new Date(
    data.program_protocol_date_2
  ).toLocaleDateString('ukr-UA');
  data.program_protocol_date_3 = new Date(
    data.program_protocol_date_3
  ).toLocaleDateString('ukr-UA');

  data.competencies = data.competencies
    .split(';')
    .filter((e: string) => e)
    .map((e: string) => {
      return { title: e };
    });
  data.result = data.result
    .split(';')
    .filter((e: string) => e)
    .map((e: string) => {
      return { title: e };
    });

  data.lec_day_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.lec_day ? acc + +obj.lec_day : acc;
  }, 0);

  data.prac_day_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.prac_day ? acc + +obj.prac_day : acc;
  }, 0);

  data.srs_day_sum =
    data.topics.reduce((acc: number, obj: any) => {
      return obj.srs_day ? acc + +obj.srs_day : acc;
    }, 0) + data.hours_day_training;

  data.individual_day_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.individual_day ? acc + +obj.individual_day : acc;
  }, 0);

  data.lec_ext_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.lec_ext ? acc + +obj.lec_ext : acc;
  }, 0);

  data.prac_ext_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.prac_ext ? acc + +obj.prac_ext : acc;
  }, 0);

  data.srs_ext_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.srs_ext ? acc + +obj.srs_ext : acc;
  }, 0);

  data.individual_ext_sum = data.topics.reduce((acc: number, obj: any) => {
    return obj.individual_ext ? acc + +obj.individual_ext : acc;
  }, 0);

  const docxFile = path.join(process.cwd(), 'src/lib/template.docx');
  const templateFile = await fs.readFile(docxFile);
  const handler = new TemplateHandler();
  const doc = await handler.process(templateFile, data);
  return doc;
}
