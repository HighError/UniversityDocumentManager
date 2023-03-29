import OnlyForAdmin from '@/components/routesControllers/OnlyForAdmin';
import { IUser } from '@/models/User';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

interface IProps {
  data: IUser[];
  err: boolean;
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('http://localhost:3000/api/users', {
      withCredentials: true,
    });
    return {
      props: { data, err: false },
    };
  } catch (err) {
    return {
      props: { data: [], err: true },
    };
  }
}

const UsersPage = ({ data, err }: IProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function remove(id: string) {
    setIsLoading(true);
    try {
      await axios.delete('/api/users', { data: { id } });
      router.reload();
    } catch (error) {
      toast.error('Помилка видалення');
      setIsLoading(false);
    }
  }

  if (err) {
    return <div>Error. Reload page.</div>;
  }

  return (
    <OnlyForAdmin>
      <div className="relative overflow-x-auto rounded-lg select-none">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Ім&apos;я
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
                  {e._id}
                </th>
                <td className="px-6 py-4"> {e.username}</td>
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
        onClick={() => router.push('/users/new')}
        className="fixed bottom-4 right-4 bg-primary-100 hover:bg-primary-150 disabled:bg-gray-200 duration-300 text-3xl p-3 rounded-full"
      >
        <AiOutlinePlus />
      </button>
    </OnlyForAdmin>
  );
};

export default UsersPage;
