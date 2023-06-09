import { UserContext } from '@/contexts/userContext';
import axios from 'axios';
import Router from 'next/router';
import { Dispatch, SetStateAction, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillFileWord, AiFillFilePdf, AiOutlineUser } from 'react-icons/ai';
import { MdCategory, MdModeEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { mutate } from 'swr';

interface IProps {
  id: string;
  title: string;
  year: string;
  user: string;
  own: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function DocumentCard({
  id,
  title,
  year,
  user,
  own,
  isLoading,
  isAdmin,
  setIsLoading,
}: IProps) {
  function downloadDocx() {
    setIsLoading(true);
    toast('Створення docx. Цей процесм може зайняти від 5 до 120 секунд');
    axios({
      url: `/api/download/docx/${id}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${title}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Помилка створення');
        setIsLoading(false);
      });
  }

  function downloadPdf() {
    setIsLoading(true);
    toast('Створення pdf. Цей процесм може зайняти від 10 до 120 секунд');
    axios({
      url: `/api/download/pdf/${id}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${title}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Помилка створення');
        setIsLoading(false);
      });
  }

  async function deleteDocument() {
    setIsLoading(true);
    axios({
      url: `/api/doc/${id}`,
      method: 'DELETE',
    })
      .then((response) => {
        toast.success('Успішно видалено!');
        mutate('/api/documents');
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Помилка видалення');
        setIsLoading(false);
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
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>
          <button
            className="bg-[#b53529] hover:bg-[#e1574c] disabled:bg-gray-300  duration-300 px-3 py-2 rounded-md text-lg"
            type="button"
            disabled={isLoading || (!own && !isAdmin)}
            onClick={() => {
              deleteDocument();
            }}
          >
            <MdOutlineDeleteForever />
          </button>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <button
            className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-300 duration-300 px-3 py-2 rounded-md text-lg"
            type="button"
            disabled={isLoading || (!own && !isAdmin)}
            onClick={() => Router.push(`/edit/${id}`)}
          >
            <MdModeEdit />
          </button>
          <button
            className="bg-[#0060c4] hover:bg-[#007dd7] disabled:bg-gray-300  duration-300 px-3 py-2 rounded-md text-lg"
            type="button"
            onClick={() => downloadDocx()}
            disabled={isLoading}
          >
            <AiFillFileWord />
          </button>
          <button
            className="bg-[#b53529] hover:bg-[#e1574c] disabled:bg-gray-300  duration-300 px-3 py-2 rounded-md text-lg"
            type="button"
            onClick={() => downloadPdf()}
            disabled={isLoading}
          >
            <AiFillFilePdf />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentCard;
