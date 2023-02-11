import NewDocumentCard from '@/components/NewDocumentCard';
import DocumentCard from '../components/DocumentCard';

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <div>Фільтри: тільки ваші, за роками. Сортування за алфавітом</div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3">
        <NewDocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
        <DocumentCard />
      </div>
    </div>
  );
}
