import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function NewYear() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useFormik({
    initialValues: {
      title: '',
      year: new Date().getFullYear(),
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post('/api/years/', {
          title: values.title,
          year: values.year,
        });
        toast.success('Успішно створено');
        router.push('/years');
      } catch (err) {
        toast.error('Помилка сервера');
      }
      setIsLoading(false);
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">Створення нового року</div>
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
          htmlFor="year"
          className="flex flex-row gap-3 items-center justify-between"
        >
          Рік:
          <input
            className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
            id="year"
            type="number"
            min={2010}
            step={1}
            required
            value={form.values.year}
            onChange={form.handleChange}
          />
        </label>
        <div className="flex flex-row gap-3 justify-between">
          <button
            className="bg-red hover:bg-orange px-3 py-2 rounded-lg"
            type="button"
            disabled={isLoading}
            onClick={() => router.push('/years')}
          >
            Скасувати
          </button>
          <button
            className="bg-primary-100 hover:bg-primary-150 px-3 py-2 rounded-lg"
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

export default NewYear;
