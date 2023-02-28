import { UserContext } from '@/contexts/userContext';
import { ReactNode, useContext } from 'react';

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <nav className="bg-gray-200 px-2 sm:px-4 py-3 fixed w-full z-20 top-0 left-0 border-b border-b-gray-300">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            UDM
          </span>
          <span>{JSON.stringify(user ?? { user: null })}</span>
        </div>
      </nav>
      <div className="mt-12 p-5">{children}</div>
    </div>
  );
}

export default Layout;
