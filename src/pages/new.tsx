import { useRouter } from 'next/router';

function NewDocument() {
  const router = useRouter();
  // TODO: Formik logic

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">Створення нового документа</div>
      <form className="mt-5 flex flex-col gap-3">
        <label
          htmlFor="title"
          className="flex flex-row gap-3 items-center justify-between"
        >
          Назва:
          <input
            className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2"
            id="title"
          />
        </label>
        <label
          htmlFor="title"
          className="flex flex-row gap-3 items-center justify-between"
        >
          Рік:
          <select className="bg-gray-100 border border-gray-400 rounded-lg px-3 py-2">
            <option>2022</option>
            <option>2023</option>
          </select>
        </label>
        <div className="flex flex-row gap-3 justify-between">
          <button
            className="bg-red hover:bg-orange px-3 py-2 rounded-lg"
            type="button"
            onClick={() => router.push('/')}
          >
            Скасувати
          </button>
          <button
            className="bg-primary-100 hover:bg-primary-150 px-3 py-2 rounded-lg"
            type="submit"
          >
            Створити
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDocument;
