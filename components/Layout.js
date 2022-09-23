import Head from 'next/head';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ title, children }) {

  return (
    <>
      <Head>
        <title>{title ? title + ' - Commerce' : 'Commerce'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <Header />
        <main className="container m-auto mt-4 px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}
