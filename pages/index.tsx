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
import Typewriter from 'typewriter-effect'

const LIMIT = 10;
// export async function getServerSideProps(){
//   const postsQuery = query(
//     collectionGroup(firestore, 'posts'),
//     where('published','==', true),
//     orderBy('createdAt','desc'),
//     limit(LIMIT)
//     )
//   const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

//   return {
//     props: { posts }, // will be passed to the page component as props
//   };

// }

interface Props {
  posts: any
}

export default function Home(props:Props): any {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);  
  const { user} = useAuth();

  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>
      {/* <div className="bg-[#FFF8F1]"> */}

      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-center">
                <h1 className="text-4xl pb-4 font-extrabold text-[#0000FF] sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Find Meaningful</span>
                  
                </h1>
                <div className='flex'>
                  <div className='w-1/2'>
                    <h1 className="text-4xl text-right pb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#47FF43] via-[#6184FF] to-[#FF43EC] font-extrabold sm:text-5xl md:text-6xl">
                          <Typewriter
                            options={{
                            strings: ['Solarpunk', 'Regenerative','Communal','Decentralized'],
                            autoStart: true,
                            loop: true,
                            delay: 100
                            }}
                          />
                    </h1>
                </div>
                <div className='w-1/2'>
                <h1 className="text-4xl text-[#0000FF] pb-4 font-extrabold text-left sm:text-5xl md:text-6xl">
                  Communities</h1>
                </div>

                </div>

                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                  {!user && (<>
                  <div>
                    <Link href='/map'>
                    <a style={{ cursor: "pointer" }}>

                      <img className="h-14 pr-8" src='https://s2.loli.net/2022/10/11/V97Me48usdEH3PA.png'/>
                    </a>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href='https://discord.gg/UAjzAx62Ug' target="_blank" rel="noreferrer">
                      <img className="h-14" src="https://s2.loli.net/2022/10/11/5lqZgjMQpfX3ThN.png" />
                    </a>
                  </div>
                  </>
                  )}
                </div>
              </div>
          </main>
    </>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//       <FrontPage>{page}</FrontPage>
//       // <Layout>{page}</Layout>

//   )
// }