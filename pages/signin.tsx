import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { useAuth } from '../lib/authContext'
import React, { useEffect, useState, useCallback, useContext } from 'react';
import SignInWithGoogle from "../components/button/googleLogin";
import Link from 'next/link';

import { useRouter } from "next/router";


export default function Home() {

  const { username, user, loading} = useAuth()


  return (
    <main>
      {user ? <ProfilePage/> : <SignInButton />}
    </main>        
  )
  
}

function SignInButton() {
  const [ email , setEmail ] =  useState<string>('')
  const [ password , setPassword ] =  useState<string>('')

  const auth=getAuth()

  function login(e : any) {
    e.preventDefault();
      signInWithEmailAndPassword(auth, email , password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log('success', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('error', errorMessage)
        window.alert(errorMessage)
      });
  }
  return (
<>
<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account.</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e:any) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e:any) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  onClick={(e:any) => login(e)}
                  // type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <SignInWithGoogle />



            </div>
          </div>
        </div>
      </div>

  </>
);
}

function ProfilePage() {
  const { username} = useAuth()

  return <>
  <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">

        <span className="block text-indigo-600 xl:inline">Hey , {username}</span>

          <span className="block">Welcome to Space Exchange!</span>
          <span className="block text-indigo-600 xl:inline">Let us start exchange!</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link href={`/admin`}>
            <a
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl "
            >
              Post a New Exchange
            </a>
            </Link>
          </div>
          <div className="ml-3 inline-flex">
          <Link href={`/getstarted`}>

            <a
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Get started
            </a>
            </Link>
          </div>
        </div>
      </div>
    </div>

  </>

}
