import TextArea from '@/components/TextArea';
import axios from 'axios';
import { FieldArray, Form, Formik } from 'formik';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface ITopics {
  title: string;
  desc: string;
  lit: string;
}

const initialData = {
  discipline: '',
  branch_number: 0,
  branch: '',
  profession_number: 0,
  profession: '',
  professional_program: '',

  hours_day_course: 0,
  hours_day_semester: '',
  hours_day_lectures: 0,
  hours_day_laboratory: 0,
  hours_day_irs: 0,
  hours_day_training: 0,
  hours_day_srs: 0,
  hours_day_test: 0,

  hours_ext_course: 0,
  hours_ext_semester: '',
  hours_ext_lectures: 0,
  hours_ext_laboratory: 0,
  hours_ext_irs: 0,
  hours_ext_training: 0,
  hours_ext_srs: 0,
  hours_ext_test: 0,

  program_protocol_1: 0,
  program_protocol_date_1: '',

  program_protocol_2: 0,
  program_protocol_date_2: '',

  program_protocol_3: 0,
  program_protocol_date_3: '',

  status: true,
  language: '',

  credits: 0,
  credit_modules: 0,
  content_modules: 0,

  weekly_hours: 0,
  classroom_hours: 0,

  goal: '',
  task: '',
  competencies: '',
  prerequisites: '',
  result: '',

  topics: [],
  labs: [],
  kpis: [],
};

const Edit = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/doc/${router.query['id']}`);
      setData(res.data.data ?? {});
      setIsLoading(false);
    } catch (err) {
      toast.error('Помилка завантаження данних');
      Router.push('/');
    }
  }, [router.query]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <Formik
        initialValues={{ ...initialData, ...data }}
        enableReinitialize={true}
        onSubmit={async (value) => {
          try {
            axios.post(`/api/doc/${router.query['id']}`, { data: value });
            toast.success('Успішно збережено');
            Router.push('/');
          } catch (err) {
            toast.error('Помилка збереження');
          }
        }}
      >
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
            <div className="w-full">
              <h2>Теми</h2>
              <FieldArray name="topics">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { topics } = values;
                  return (
                    <div className="flex flex-col gap-2">
                      {(topics ?? []).map((data: any, index: number) => (
                        <div
                          className="flex flex-col gap-3 rounded-lg my-1 border-4 p-3 border-gray-300"
                          key={index}
                        >
                          <TextArea
                            title="Назва"
                            id={`topics[${index}].title`}
                          />
                          <TextArea
                            title="Опис"
                            id={`topics[${index}].description`}
                            textarea
                          />
                          <TextArea
                            title="Література"
                            id={`topics[${index}].lit`}
                          />
                          <div className="text-lg mt-3">Денна:</div>
                          <div className="flex flex-row gap-2 items-center">
                            <TextArea
                              title="Лекції"
                              id={`topics[${index}].lec_day`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Практичні заняття"
                              id={`topics[${index}].prac_day`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Самостійна робота"
                              id={`topics[${index}].srs_day`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Індивідуальна робота"
                              id={`topics[${index}].individual_day`}
                              type="nubmer"
                            />
                          </div>
                          <TextArea
                            title="Контрольні заходи"
                            id={`topics[${index}].control_day`}
                          />
                          <div className="text-lg mt-3">Заочна:</div>
                          <div className="flex flex-row gap-2 items-center">
                            <TextArea
                              title="Лекції"
                              id={`topics[${index}].lec_ext`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Практичні заняття"
                              id={`topics[${index}].prac_ext`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Самостійна робота"
                              id={`topics[${index}].srs_ext`}
                              type="nubmer"
                            />
                            <TextArea
                              title="Індивідуальна робота"
                              id={`topics[${index}].individual_ext`}
                              type="nubmer"
                            />
                          </div>
                          <div className="flex flex-row gap-2">
                            <TextArea
                              title="Контрольні заходи"
                              id={`topics[${index}].control_ext`}
                            />
                            <div className="flex flex-row h-min gap-3 ">
                              <button
                                type="button"
                                className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                        onClick={() => push('')}
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="w-full">
              <h2>Лабораторні</h2>
              <FieldArray name="labs">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { labs } = values;
                  return (
                    <div className="flex flex-col gap-2">
                      {(labs ?? []).map((data: any, index: number) => (
                        <div
                          className="flex flex-col gap-3 rounded-lg my-1 border-4 p-3 border-gray-300"
                          key={index}
                        >
                          <TextArea title="Тема" id={`labs[${index}].title`} />
                          <TextArea
                            title="Мета"
                            id={`labs[${index}].goal`}
                            textarea
                          />
                          <div className="flex flex-row h-min gap-3 ">
                            <TextArea
                              title="Література"
                              id={`labs[${index}].lit`}
                            />
                            <button
                              type="button"
                              className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                        onClick={() => push('')}
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="w-full">
              <h2>Варіанти КПІЗів</h2>
              <FieldArray name="kpis">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { kpis } = values;
                  return (
                    <div className="flex flex-col gap-1">
                      {(kpis ?? []).map((data: any, index: number) => (
                        <div
                          className="rounded-lg border-gray-300 flex flex-row gap-1"
                          key={index}
                        >
                          <TextArea
                            title={`${index + 1}`}
                            id={`kpis[${index}].title`}
                          />
                          <button
                            type="button"
                            className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                            onClick={() => remove(index)}
                          >
                            -
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                        onClick={() => push('')}
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="w-full">
              <h2>Самостійні</h2>
              <FieldArray name="srs_variants">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { srs_variants } = values;
                  return (
                    <div className="flex flex-col gap-2">
                      {(srs_variants ?? []).map((data: any, index: number) => (
                        <div
                          className="flex flex-col gap-3 rounded-lg my-1 border-4 p-3 border-gray-300"
                          key={index}
                        >
                          <TextArea
                            title="Тематика"
                            id={`srs_variants[${index}].title`}
                          />
                          <div className="flex flex-row h-min gap-3 ">
                            <TextArea
                              title="К-сть годин (денна)"
                              id={`srs_variants[${index}].day`}
                              type="number"
                            />
                            <TextArea
                              title="К-сть годин (заочна)"
                              id={`srs_variants[${index}].ext`}
                              type="number"
                            />
                            <button
                              type="button"
                              className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                        onClick={() => push('')}
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="w-full">
              <h2>Тренінги</h2>
              <div className="flex flex-col gap-1">
                <TextArea title="Тематика" id={`training_topic`} />
                <TextArea title="Завдання" id={`training_task`} />
                <TextArea title="Література" id={`training_lit`} />
              </div>
              <h3 className="text-lg my-2">Порядок проведення тренінгу:</h3>
              <FieldArray name="training">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { training } = values;
                  return (
                    <div className="flex flex-col gap-2">
                      {(training ?? []).map((data: any, index: number) => (
                        <div
                          className="flex flex-col gap-3 rounded-lg"
                          key={index}
                        >
                          <div className="flex flex-row h-min gap-3 ">
                            <TextArea
                              title={`${index + 1}`}
                              id={`training[${index}].title`}
                            />
                            <button
                              type="button"
                              className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="px-3 py-2 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
                        onClick={() => push('')}
                      >
                        +
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <div className="w-full">
              <h2>Модулі</h2>
              <TextArea title="Заліковий модуль 1" id={`mod_1`} />
              <TextArea title="Заліковий модуль 2" id={`mod_2`} />
              <TextArea title="Заліковий модуль 3" id={`mod_3`} />
              <div className="flex flex-row gap-2"></div>
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="px-3 py-3 bg-primary-100 hover:bg-primary-200 duration-300 disabled:bg-gray-200 rounded-lg"
              >
                Зберегти
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Edit;
