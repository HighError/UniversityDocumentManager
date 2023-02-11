/* eslint-disable no-underscore-dangle */
import { IYear } from '@/models/Year';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

function Years() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<IYear[]>([]);

  async function load() {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/years');
      res.data.sort((a: IYear, b: IYear) => {
        if (a.year > b.year) return -1;
        if (a.year < b.year) return 1;
        return 0;
      });
      setData(res.data);
    } catch (err) {
      toast.error('Помилка завантаження даних');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    setIsLoading(true);
    try {
      await axios.delete('/api/years', { data: { id } });
      await load();
    } catch (err) {
      toast.error('Помилка видалення');
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="relative overflow-x-auto rounded-lg select-none">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Заголовок
              </th>
              <th scope="col" className="px-6 py-3">
                Рік
              </th>
              <th scope="col" className="px-6 py-3">
                Видалити
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e._id} className="bg-gray-200/75">
                <th scope="row" className="px-6 py-4">
                  {e.title}
                </th>
                <td className="px-6 py-4"> {e.year}</td>
                <td className="px-6 py-4">
                  <button
                    disabled={isLoading}
                    type="button"
                    className="bg-red hover:bg-orange disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                    onClick={() => remove(e._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => router.push('/years/new')}
        className="fixed bottom-4 right-4 bg-primary-100 hover:bg-primary-150 disabled:bg-gray-200 duration-300 text-3xl p-3 rounded-full"
      >
        <AiOutlinePlus />
      </button>
    </>
  );
}

export default Years;
