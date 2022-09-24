import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <form
        className="flex items-center justify-center flex-col gap-5 mx-auto mt-20 max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>

        <div
          className={
            'relative flex items-center text-gray-400 focus-within:text-gray-600'
          }
        >
          <EnvelopeIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            id="email"
            {...register('email', {
              required: 'Please enter Email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid Email',
              },
            })}
            placeholder="Email"
            className="w-full pr-3 pl-10 py-2  placeholder-gray-500 text-black rounded-2xl border-none ring-1 ring-black focus:ring-gray-500 focus:ring-2"
            autoFocus
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}

        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 mb-1 mt-4">
          <LockClosedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            id="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            type="password"
            placeholder="Password"
            className="w-90 pr-3 pl-10 py-2  placeholder-gray-500 text-black rounded-2xl border-none ring-1 ring-black focus:ring-gray-500 focus:ring-2"
            autoFocus
          />
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <div className="mb-4 w-full flex items-center justify-center">
          <button className="primary-button w-56">Login</button>
        </div>

        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
