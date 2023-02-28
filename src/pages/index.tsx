/* eslint-disable no-underscore-dangle */
import NewDocumentCard from '@/components/NewDocumentCard';
import { IDocument } from '@/models/Document';
import DocumentCard from '../components/DocumentCard';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/userContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const { data, error } = useSWR<IDocument[]>('/api/documents', fetcher);
  useEffect(() => console.log(data, error), [data, error]);
  return (
    <div className="flex flex-col gap-5">
      <div>Фільтри: тільки ваші, за роками. Сортування за алфавітом</div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3">
        <NewDocumentCard />
        {data ? (
          data.map((e) => (
            <DocumentCard
              key={e._id}
              title={e.title}
              year={e.year.title}
              user={e.user.username}
              own={e.user._id === user?._id}
            />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
