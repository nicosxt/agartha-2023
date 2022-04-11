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


const LIMIT = 1;
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

export default function Home(props:Props){
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    // console.log(last)
    // console.log('++++++')

    const cursor = typeof last?.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT))

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
      <h1>Hey Beauty, What's Up?</h1>
      
      <PostFeed posts={posts}  admin={false} />

        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'You have reached the end!'}

      </main>
    </>
  )
}

