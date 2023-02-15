/* eslint-disable no-underscore-dangle */
import NewDocumentCard from '@/components/NewDocumentCard';
import { IDocument } from '@/models/Document';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';

interface IProps {
  data: IDocument[];
  err: boolean;
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('http://localhost:3000/api/documents');
    return {
      props: { data, err: false },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { data: [], err: true },
    };
  }
}

export default function Home({ data, err }: IProps) {
  if (err) {
    return <div>Error</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      <div>Фільтри: тільки ваші, за роками. Сортування за алфавітом</div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3">
        <NewDocumentCard />
        {data.map((e) => (
          <DocumentCard key={e._id} title={e.title} year={e.year.title} />
        ))}
      </div>
    </div>
  );
}
