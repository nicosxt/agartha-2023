import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, getDoc, collection, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import type { NextPage, GetServerSideProps } from 'next'
import { useContext } from 'react';
import { authContext } from '../../lib/authContext'

interface Props{
    username: string
}

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
        // console.log(user)
        // console.log(user.id)
        const uid = user.uid! 
        // console.log(uid)

        const postsQuery = query(
            collection(firestore, "users", uid, "posts"), 
            // where('published','==', true),
            orderBy('createdAt','desc'));
        // const postsQuery = query(
        //     collection(firestore, "users", uid, "posts"), 
        //     where('published','==', true),
        //     orderBy('createdAt','desc'),
        //     limit(5));

        posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    }
    

    return {
        props: {user, posts}
    }
    

}

interface User {
    user: any
    posts: any
}
export default function UserProfilePage(props: User): any {
    const { user, posts } = props;

    return (
    <main>
        <UserProfile user={user} />
        <PostFeed posts={posts} admin={true} />
    </main>
    )  
}