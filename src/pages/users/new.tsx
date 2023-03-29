import OnlyForAdmin from '@/components/routesControllers/OnlyForAdmin';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

function NewUser() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post('/api/users/', {
          username: values.username,
          password: values.password,
        });
        toast.success('Успішно створено');
        router.push('/users');
      } catch (err) {
        toast.error('Помилка сервера');
      }
      setIsLoading(false);
    },
  });

  return (
    <OnlyForAdmin>
      <div className="flex flex-col items-center">
        <div className="text-2xl">Створення нового користувача</div>
        <form className="mt-5 flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="title"
            className="flex flex-row gap-3 items-center justify-between"
          >
            І&apos;мя користувача (логін):
            <input
              className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
              id="username"
              required
              value={form.values.username}
              onChange={form.handleChange}
            />
          </label>
          <label
            htmlFor="year"
            className="flex flex-row gap-3 items-center justify-between"
          >
            Пароль:
            <input
              className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
              id="password"
              type="password"
              required
              value={form.values.password}
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
    </OnlyForAdmin>
  );
}

export default NewUser;
