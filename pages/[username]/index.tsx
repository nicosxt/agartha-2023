import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { fromMillis } from '../../lib/firebaseConfig/init';
import Loader from '../../components/misc/loader';

interface Props{
    username: string
}
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
    // console.log('hi')

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
export default function UserProfilePage(props: User): any {
    const { user, username } = props;
    const [posts, setPosts] = useState(props.posts);

    const [loading, setLoading] = useState(false);

    const [postsEnd, setPostsEnd] = useState(false);
    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
        // console.log(last)
        // console.log('++++++')
    
        const cursor = typeof last?.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
        console.log("cursor", cursor)
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
    <main>
        <UserProfile user={user} username={username} />
        <PostFeed posts={posts} admin={true} />
        <div className="min-h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
                {!loading && !postsEnd &&
                <button 
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"

                    onClick={getMorePosts}>
                         <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Posts
              </span>
                        </button>}

                <Loader show={loading} />

                {postsEnd && 
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
            </div>
        </div>
        </div>


    </main> 
    )  
}