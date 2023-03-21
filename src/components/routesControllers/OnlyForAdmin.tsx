import { ReactNode, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '@/contexts/userContext';
import Loading from '../Loading';

function OnlyForAdmin({ children }: { children: ReactNode }) {
  const { user, error, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || error) {
    Router.push('/login');
  } else if (!user.isAdmin) {
    Router.push('/');
  }

  return <div>{children}</div>;
}

export default OnlyForAdmin;
