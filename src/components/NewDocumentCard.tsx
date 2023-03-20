import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';

function NewDocumentCard({ isLoading }: { isLoading: boolean }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-gray-200 px-4 py-3 rounded-lg">
      <button
        className="bg-primary-100 hover:bg-primary-150 duration-300 rounded-full text-5xl p-4"
        type="button"
        disabled={isLoading}
        onClick={() => router.push('/new')}
      >
        <AiOutlinePlus />
      </button>
      <div className="text-xl">Створити новий документ</div>
    </div>
  );
}

export default NewDocumentCard;
