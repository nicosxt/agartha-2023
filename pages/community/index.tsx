import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useAuth } from '../../lib/authContext'
import { useContext, useState } from 'react';
import AuthCheck from "../../components/misc/authcheck";
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc, getDoc, collection, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import { authContext } from '../../lib/authContext'
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import PostFeed from "../../components/users/PostFeed";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import 'flowbite';
import React from 'react'
import CommunityProfilePage from "../../components/communities/CommunityProfile";
import CommunityFeed from "../../components/communities/CommunityFeed";

export default function CommunityDisplayPage(props:any) {
    const { user, posts } = props;

    return (
    <main>
        <CommunityProfilePage user={user}/>
        <CommunityFeed posts={posts} admin={false}/>
    </main>
    )  
  }

export function CommunityList() {
    const auth = getAuth();
    const { username } = useContext(authContext);
    const uid:string = auth?.currentUser?.uid!;
    const postsQuery = query(
        collection(firestore, "users", uid, "posts"), 
        orderBy('createdAt','desc'));
    const [querySnapshot] = useCollection(postsQuery);
    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
          <h1>Manage your Posts</h1>
          <PostFeed posts={posts} admin />
        </>
      );
}
