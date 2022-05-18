import { firestore } from '../lib/firebaseConfig/init';
import Head from 'next/head'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../lib/authContext'
import debounce from 'lodash.debounce';
import { doc, getDoc, collection, addDoc, setDoc, getDocs} from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import SignInWithGoogle from '../components/button/googleLogin';
import {Text} from '@chakra-ui/react';
export default function Home() {
  const { user , username, loading} = useAuth()

  return (
    <main>{user ? !username ? <UsernameForm /> :<ProfilePage /> : <SignUpButton />}</main>
  )

}

function SignUpButton() {
  const [ email , setEmail ] =  useState<string>('')
  const [ password , setPassword ] =  useState<string>('')

  const auth = getAuth()
  function createUserCredentials(e:any){
    e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
    .then( userCredential => {
      const user = userCredential.user;
      console.log('success', user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorMessage)
      window.alert(errorMessage)
      // ..
    });
  }
  return (
    <>
<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for Space Exchange!</h2>
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
                    placeholder="(min. 6 characters)"
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
                  onClick={(e:any) => createUserCredentials (e) }
                  // type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
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

        <span className="block text-indigo-600 xl:inline">Hey, {username}</span>

          <span className="block">Welcome to Space Exchange!</span>
          <span className="block text-indigo-600 xl:inline">Let us start with your User Profile.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link href={`/${username}`}>
            <a
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl "
            >
              Bring me to my profile
            </a>
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>

  </>


}

function UsernameForm() {
  const [formValue, setFormValue] = useState(''); //user enter name 
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {username, user} = useAuth();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {        
        const docRef = doc(firestore, 'usernames', username);
        const docSnap = await getDoc(docRef)
        const exists = docSnap.exists();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );
  const onChange = (e: React.ChangeEvent<any>) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await setDoc(doc(firestore, "usernames", formValue), {
      uid: currentUser?.uid,
    })    
    await setDoc(doc(firestore, "users", currentUser!.uid), {
      uid: currentUser?.uid,
      email: currentUser?.email,
      username: formValue
    })  

  };

  return <>
  <br></br>
  <br></br>
  <br></br>
  {(
    !username && (
      <section>
          <form onSubmit={onSubmit}>

              <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pick Your Username</label>
              <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              </div>
              <input name="username" placeholder="Username (min. 3 characters)"  value={formValue} onChange={onChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>


            <button type="submit" className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" disabled={!isValid}>Choose</button>
              <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          </form>
      </section>
    )
  )}</>;


}

interface Props {
  username: string
  isValid: boolean
  loading: any
}

function UsernameMessage(props:Props): any{
  const { loading, isValid, username } = props;

  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <Text color='green'>{username} is available!</Text>;
  } else if (username.length < 3 && username.length> 0) {
    return <Text color='tomato'>{username} is too short!</Text>;
  } else if (username && !isValid) {
    return <Text color='tomato'>{username} is taken!</Text>;
  } else {
    return <p></p>;
  }
}