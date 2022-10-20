import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useAuth } from '../../lib/authContext'
import { useContext, useEffect, useState } from 'react';
import AuthCheck from "../../components/misc/authcheck";
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc, getDoc, collection, addDoc, setDoc, 
  getDocs, query, where, limit, orderBy,
  onSnapshot
} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import { authContext } from '../../lib/authContext'
import React from 'react'
import { nanoid } from "nanoid";
import CommunityPostForm from "../../components/communities/CommunityPostForm";

export default function CommunityAdminPostsPage(props:any) {
    return (
      <main>
        {/* <AuthCheck> */}
          <CreateNewCommunity />
        {/* </AuthCheck> */}
      </main>
    );
  }


export function CreateNewCommunity () {
  const slug = nanoid();

    return (
      <>
      <CommunityPostForm slug={slug}/>
      </>
    );
}
