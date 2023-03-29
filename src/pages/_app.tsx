import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import UserProvider from '@/contexts/userContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster position="top-right" reverseOrder={false} />
      </Layout>
    </UserProvider>
  );
}
