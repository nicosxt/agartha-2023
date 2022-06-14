import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import { fromMillis } from '../../lib/firebaseConfig/init';
import Loader from '../../components/misc/loader';
import {useState, useEffect} from 'react';
import Link from 'next/link';
const LIMIT = 5;
export async function getServerSideProps(context:any) {
    const {query:qr} = context;
    const {username} = qr;
    const userDoc = await getUserWithUsername(username)
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    let user = null;
    let posts = null;

    if (userDoc) {
        user = userDoc.data();
        const uid = user.uid! 
        const postsQuery = query(
            collection(firestore, "users", uid, "posts"), 
            orderBy('createdAt','desc'),
            limit(LIMIT)
            );

        posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    }
    

    return {
        props: {user, posts, username}
    }
    

}

interface User {
    user: any
    posts: any
    username: string
}
export default function ExchangePage(props: User): any {

    const { user, username } = props;
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);

    const [postsEnd, setPostsEnd] = useState(false);

    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
    
        const cursor = typeof last?.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
        // console.log("cursor", cursor)
        const uid = user.uid! 
        const postsQuery = query(
        collection(firestore, "users", uid, "posts"),
        //   where('published', '==', true),
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
    <div className="min-h-full">

     <h1 className="text-2xl font-semibold text-center text-gray-900">Exchanges</h1>
                <div className="mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/>
    <Link href="/admin">
        <button 
            className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:scale-105"

                   >
                         <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              + Create a New Exchange
              </span>
    </button>   
    </Link>
     <PostFeed posts={posts} admin={true} />
        <div className="mt-8 min-h-full">
                {!loading && !postsEnd && posts.length > 0 && 
                <button 
                    className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"

                    onClick={getMorePosts}>
                         <span className=" w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Posts
              </span>
                        </button>}

                <Loader show={loading} />

                {(postsEnd || posts.length === 0) && 
              <button className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className=" w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
            </div>
        </div>

    </>
    )
}