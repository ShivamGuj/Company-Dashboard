import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import '../styles/global.css';
import dotenv from 'dotenv';
dotenv.config();

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <div className="pt-16">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
