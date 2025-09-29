'use client';

import React, { FormEvent, useState } from 'react';

import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with:', { username, password });
    setLoading(true);
    // setError(null) // Clear previous errors when a new request starts

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (!response.ok) {
        // throw new Error('Failed to submit the data. Please try again.')
        setStatus(-1);
      } else {
        const { success, token } = await response.json();
        console.log('API response:', { success, token });
        if (success) {
          const cookies = new Cookies();
          cookies.set('token', token, {
            path: '/',
            domain: 'localhost',
            secure: false,
            sameSite: 'lax',
          });
          setStatus(1);
          console.log(
            'Cookie set, redirecting to:',
            router.query.next || '/admin'
          );
          // Force reload to ensure middleware sees the cookie
          window.location.href = router.query.next?.toString() || '/admin';
        } else setStatus(-1);
      }
    } catch (error) {
      setStatus(-1);
      // console.error(error)
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-12 flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Admin</h1>
        <p className="text-sm dark:text-gray-400">
          Sign in to access the admin site
        </p>
      </div>
      <form noValidate={true} onSubmit={loginSubmit} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              User name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
          <p className="text-xs dark:text-red-500 h-2">
            {status < 0 && 'Incorrect username or password'}
          </p>
        </div>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="login-submit"
              className="text-center block w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-400 dark:text-gray-900 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-t-transparent border-solid animate-spin rounded-full border-gray-900 border-2"></div>
                  Logging in
                </>
              ) : (
                'Login'
              )}
            </label>
            <input
              id="login-submit"
              type="submit"
              hidden
              disabled={loading === true}
            />
          </div>
          {/* <p className="px-6 text-sm text-center dark:text-gray-400">
            Don't have an account yet?
            <a
              rel="noopener noreferrer"
              href="#"
              className="hover:underline dark:text-rose-400"
            >
              Sign up
            </a>
            .
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
