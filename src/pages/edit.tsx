import TextArea from '@/components/TextArea';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { NextPageContext } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps(context: any) {
  try {
    const { data } = await axios.get(`/api/doc/${context.params.id}`);
    return {
      props: { data },
    };
  } catch (err) {
    return {
      props: { data: null },
    };
  }
}

const Edit = ({ data }: { data: any }) => {
  useEffect(() => {
    if (!data) {
      Router.push('/');
    }
  }, [data]);
  return (
    <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <div className="flex flex-row items-center justify-center">
          <Form className="flex flex-col gap-3 max-w-5xl items-center">
            <TextArea title="Дисципліна" id="discipline" />
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <TextArea
                title="Галузь знань (номер)"
                id="branch_number"
                type="number"
              />
              <TextArea title="Галузь знань (назва)" id="branch" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <TextArea
                title="Спеціальність (номер)"
                id="profession_number"
                type="number"
              />
              <TextArea title="Спеціальність (назва)" id="profession" />
            </div>
            <TextArea
              title="Освітньо-професійна програма"
              id="professional_program"
            />
            <h2>Години (Денна форма)</h2>
            <div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea title="Курс" id="hours_day_course" type="number" />
                <TextArea title="Семестр" id="hours_day_semester" />
                <TextArea
                  title="Лекції"
                  id="hours_day_lectures"
                  type="number"
                />
                <TextArea
                  title="Лаб."
                  id="hours_day_laboratory"
                  type="number"
                />
              </div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea title="ІРС" id="hours_day_irs" type="number" />
                <TextArea
                  title="Тренінг"
                  id="hours_day_training"
                  type="number"
                />
                <TextArea title="СРС" id="hours_day_srs" type="number" />
                <TextArea title="Залік" id="hours_day_test" type="number" />
              </div>
            </div>
            <h2>Години (Заочна форма)</h2>
            <div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea title="Курс" id="hours_ext_course" type="number" />
                <TextArea title="Семестр" id="hours_ext_semester" />
                <TextArea
                  title="Лекції"
                  id="hours_ext_lectures"
                  type="number"
                />
                <TextArea
                  title="Лаб."
                  id="hours_ext_laboratory"
                  type="number"
                />
              </div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea title="ІРС" id="hours_ext_irs" type="number" />
                <TextArea
                  title="Тренінг"
                  id="hours_ext_training"
                  type="number"
                />
                <TextArea title="СРС" id="hours_ext_srs" type="number" />
                <TextArea title="Залік" id="hours_ext_test" type="number" />
              </div>
            </div>
            <h2>Протоколи</h2>
            <div className="w-full flex flex-col ">
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea
                  title="Протокол №"
                  id="program_protocol_1"
                  type="number"
                />
                <TextArea
                  title="Дата"
                  id="program_protocol_date_1"
                  type="date"
                />
              </div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea
                  title="Протокол №"
                  id="program_protocol_2"
                  type="number"
                />
                <TextArea
                  title="Дата"
                  id="program_protocol_date_2"
                  type="date"
                />
              </div>
              <div className="flex flex-row gap-5 items-center justify-between w-full">
                <TextArea
                  title="Протокол №"
                  id="program_protocol_3"
                  type="number"
                />
                <TextArea
                  title="Дата"
                  id="program_protocol_date_3"
                  type="date"
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <TextArea title="Обов'язкова?" id="status" type="checkbox" />
              <TextArea title="Мова" id="language" />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <TextArea title="Кількість кредитів" id="credits" type="number" />
              <TextArea
                title="Кількість залікових модулів"
                id="credit_modules"
                type="number"
              />
              <TextArea
                title="Кількість змістових модулів"
                id="content_modules"
                type="number"
              />
            </div>
            <div className="flex flex-row gap-5 items-center justify-between w-full">
              <TextArea
                title="Тижневих годин"
                id="weekly_hours"
                type="number"
              />
              <TextArea
                title="з них аудиторних"
                id="classroom_hours"
                type="number"
              />
            </div>
            <TextArea title="Метою вивчення дисципліни є" id="goal" textarea />
            <TextArea
              title="Завданням вивчення дисципліни є"
              id="task"
              textarea
            />
            <TextArea
              title="Найменування та опис компетентностей (розділити знаком ';')"
              id="competencies"
              textarea
            />
            <TextArea
              title="Передумови для вивчення дисципліни"
              id="prerequisites"
              textarea
            />
            <TextArea
              title="Результати навчання (розділити знаком ';')"
              id="result"
              textarea
            />
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Edit;
