import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
}
