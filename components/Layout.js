import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

export default function Layout({ title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Commerce' : 'Commerce'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}
