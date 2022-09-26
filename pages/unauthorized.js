import React from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <div className="flex w-full flex-wrap  justify-center items-center h-40">
        <h1 className="text-xl w-full flex justify-center items-center">
          Access Denied
        </h1>
        {message && (
          <div className=" w-full mb-4 font-bold text-red-500 flex justify-center items-center">
            {message}
          </div>
        )}
      </div>
    </Layout>
  );
}
