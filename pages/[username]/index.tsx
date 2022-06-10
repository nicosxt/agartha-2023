import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/users/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init' ;
import type { NextPage, GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { fromMillis } from '../../lib/firebaseConfig/init';

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


    return (
    <>
        
        <UserProfile user={user} username={username} />
        </>
    )  
}

