import type { NextPage } from 'next'
import Head from 'next/head'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { collectionGroup, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  
import { firestore } from '../lib/firebaseConfig/init'
import { getUserWithUsername, postToJSON } from '../lib/firebaseConfig/init';
import PostFeed from '../components/users/PostFeed';
import { useState } from 'react';
import Loader from '../components/misc/loader';
import { fromMillis } from '../lib/firebaseConfig/init';
import Card from '@mui/material/Card';
import Link from 'next/link'
import { useAuth,signOut } from '../lib/authContext'
import type { ReactElement } from 'react'
import Layout from '../components/layout'
import FrontPage from '../components/layout/frontpage'

const LIMIT = 10;
export async function getServerSideProps(){
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published','==', true),
    orderBy('createdAt','desc'),
    limit(LIMIT)
    )
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };

}

interface Props {
  posts: any
}

export default function Home(props:Props): any {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);  
  const { user} = useAuth()




  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>
      <div className="relative bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto pt-8">
          <div className="relative z-10 pt-8 pb-8 bg-white sm:pb-8 md:pb-8 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-8">
            <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="50,0 100,0 50,100 0,100" /></svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Space</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 xl:inline"> Exchange</span>
                </h1>
                <p className="mt-2 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">Low cost & high quality space exchange with your 1st or 2nd degree connection. 🙂</p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!user && (<>
                  <div className="rounded-md shadow">
                    <Link href='/signup'>
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  md:py-4 md:text-lg md:px-10"> Sign Up </a>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href='/signin'>
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"> Log In </a>
                    </Link>
                  </div>
                  </>
                  )}
                </div>
              </div>
          </main>
        </div>
      </div>
    <div className="pt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://s2.loli.net/2022/04/14/PAmBNk9uo6vfTZW.png" alt=""/>
    </div>
    </div>

    </>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//       <FrontPage>{page}</FrontPage>
//       // <Layout>{page}</Layout>

//   )
// }