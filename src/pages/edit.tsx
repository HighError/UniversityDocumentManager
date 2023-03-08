import TextArea from '@/components/TextArea';
import { Field, Form, Formik } from 'formik';

const Edit = () => {
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
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Edit;
