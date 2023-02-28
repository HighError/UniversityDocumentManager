import { ReactNode, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '@/contexts/userContext';
import Loading from '../Loading';

function OnlyForNotAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    Router.push('/');
  }

  return <div>{children}</div>;
}

export default OnlyForNotAuth;
