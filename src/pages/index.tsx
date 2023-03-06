/* eslint-disable no-underscore-dangle */
import NewDocumentCard from '@/components/NewDocumentCard';
import { IDocument } from '@/models/Document';
import DocumentCard from '../components/DocumentCard';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '@/contexts/userContext';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';

export default function Home() {
  const { user } = useContext(UserContext);
  const { data, error } = useSWR<IDocument[]>('/api/documents', fetcher);
  const [sortingData, setSortingData] = useState<IDocument[]>([]);
  const [sortSetup, setSortSetup] = useState({
    onlyMy: false,
    onlyNowYear: true,
  });

  const updateSort = useCallback(() => {
    let temp = [...(data ?? [])];
    if (sortSetup.onlyMy) {
      temp = temp.filter((e) => e.user._id === user?._id);
    }
    if (sortSetup.onlyNowYear) {
      const now = new Date();
      temp = temp.filter(
        (e) =>
          e.year.year ===
          (now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1)
      );
    }
    setSortingData(temp);
  }, [data, sortSetup, user?._id]);

  useEffect(() => {
    setSortingData([...(data ?? [])]);
    updateSort();
  }, [data, updateSort]);

  return (
    <OnlyForAuth>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-3">
          <label className="flex flex-row gap-2">
            Тільки мої:
            <input
              type="checkbox"
              checked={sortSetup.onlyMy}
              onChange={(e) => {
                setSortSetup({ ...sortSetup, onlyMy: e.target.checked });
                updateSort();
              }}
            />
          </label>
          <label className="flex flex-row gap-2">
            Тільки цей рік:
            <input
              type="checkbox"
              checked={sortSetup.onlyNowYear}
              onChange={(e) => {
                setSortSetup({ ...sortSetup, onlyNowYear: e.target.checked });
                updateSort();
              }}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-3">
          <NewDocumentCard />
          {sortingData.map((e) => (
            <DocumentCard
              key={e._id}
              title={e.title}
              year={e.year.title}
              user={e.user.username}
              own={e.user._id === user?._id}
            />
          ))}
        </div>
      </div>
    </OnlyForAuth>
  );
}
