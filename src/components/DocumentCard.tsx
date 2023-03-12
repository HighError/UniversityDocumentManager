import { UserContext } from '@/contexts/userContext';
import GenerateDocx from '@/lib/generate';
import axios from 'axios';
import Router from 'next/router';
import { useContext } from 'react';
import { AiFillFileWord, AiFillFilePdf, AiOutlineUser } from 'react-icons/ai';
import { MdCategory, MdModeEdit } from 'react-icons/md';

interface IProps {
  id: string;
  title: string;
  year: string;
  user: string;
  own: boolean;
}

function DocumentCard({ id, title, year, user, own }: IProps) {
  function downloadDocx() {
    axios({
      url: `/api/download/docx/${id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `${title}.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  }
  return (
    <div className="bg-gray-200 px-4 py-3 rounded-lg">
      <div className="text-2xl font-semibold mb-2">{title}</div>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex flex-row gap-3 items-center">
          <MdCategory className="text-primary-200 text-lg" />
          <div>Навчальний рік: {year}</div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <AiOutlineUser className="text-primary-200 text-lg" />
          <div>
            Автор: {user} {own && '(ви)'}
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <AiOutlineUser className="text-primary-200 text-lg" />
          <div>Статус заповненості: 0%</div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3">
        <button
          className="bg-primary-100 hover:bg-primary-150 duration-300 px-3 py-2 rounded-md text-lg"
          type="button"
          onClick={() => Router.push(`/edit/${id}`)}
        >
          <MdModeEdit />
        </button>
        <button
          className="bg-primary-100 hover:bg-primary-150 duration-300 px-3 py-2 rounded-md text-lg"
          type="button"
          onClick={() => downloadDocx()}
        >
          <AiFillFileWord />
        </button>
        <button
          className="bg-primary-100 hover:bg-primary-150 duration-300 px-3 py-2 rounded-md text-lg"
          type="button"
        >
          <AiFillFilePdf />
        </button>
      </div>
    </div>
  );
}

export default DocumentCard;
