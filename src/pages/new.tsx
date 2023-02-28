/* eslint-disable no-underscore-dangle */
import { IYear } from '@/models/Year';
import axios from 'axios';
import { useFormik } from 'formik';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';

function NewDocument() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [years, setYears] = useState<IYear[]>([]);

  useEffect(() => {
    async function updateYears() {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/api/years');
        setYears(
          data.sort((a: IYear, b: IYear) => {
            if (a.year > b.year) return -1;
            if (a.year < b.year) return 1;
            return 0;
          })
        );
        setIsLoading(false);
      } catch (err) {
        toast.error('Невдалось завантажити дані!');
        Router.push('/');
      }
    }

    updateYears();
  }, []);

  const form = useFormik({
    initialValues: {
      title: '',
      year: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post('/api/documents/', {
          title: values.title,
          yearID: values.year,
        });
        toast.success('Успішно створено');
        mutate('/api/documents');
        Router.push('/');
      } catch (err) {
        toast.error('Помилка сервера');
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">Створення нового документа</div>
      <form className="mt-5 flex flex-col gap-3" onSubmit={form.handleSubmit}>
        <label
          htmlFor="title"
          className="flex flex-row gap-3 items-center justify-between"
        >
          Назва:
          <input
            className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
            id="title"
            required
            value={form.values.title}
            onChange={form.handleChange}
          />
        </label>
        <label
          htmlFor="title"
          className="flex flex-row gap-3 items-center justify-between"
        >
          Рік:
          <select
            id="year"
            className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
            required
            value={form.values.year}
            onChange={form.handleChange}
          >
            <option value="">...</option>
            {years.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-row gap-3 justify-between">
          <button
            className="bg-red hover:bg-orange disabled:bg-gray-200 px-3 py-2 rounded-lg"
            type="button"
            disabled={isLoading}
            onClick={() => Router.push('/')}
          >
            Скасувати
          </button>
          <button
            className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-200 px-3 py-2 rounded-lg"
            type="submit"
            disabled={isLoading}
          >
            Створити
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDocument;
