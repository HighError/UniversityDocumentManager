import { AiFillFileWord, AiFillFilePdf, AiOutlineUser } from 'react-icons/ai';
import { MdCategory, MdModeEdit } from 'react-icons/md';

function DocumentCard() {
  return (
    <div className="bg-gray-200 px-4 py-3 rounded-lg">
      <div className="text-2xl font-semibold mb-2">Title</div>
      <div className="line-clamp-2 text-gray-400 mb-5">
        Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle
        Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle Subtitle
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex flex-row gap-3 items-center">
          <MdCategory className="text-primary-200 text-lg" />
          <div>Навчальний рік: 2022-2023</div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <AiOutlineUser className="text-primary-200 text-lg" />
          <div>Автор: User1 (ви)</div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3">
        <button
          className="bg-primary-100 hover:bg-primary-150 duration-300 px-3 py-2 rounded-md text-lg"
          type="button"
        >
          <MdModeEdit />
        </button>
        <button
          className="bg-primary-100 hover:bg-primary-150 duration-300 px-3 py-2 rounded-md text-lg"
          type="button"
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
