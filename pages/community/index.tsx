import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useAuth } from '../../lib/authContext'
import { useContext, useState } from 'react';
import AuthCheck from "../../components/misc/authcheck";
import { useCollection, useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { doc, getDoc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import { authContext } from '../../lib/authContext'
import { getUserWithUsername, communityToJSON } from '../../lib/firebaseConfig/init';
import PostFeed from "../../components/users/PostFeed";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import React from 'react'
import CommunityPage from "../../components/communities/CommunityPage";
import CommunityFeed from "../../components/communities/CommunityFeed";
import ManageCommunity from "../../components/communities/ManageCommunity";
import ExploreCommunity from "../../components/communities/ExploreCommunity";

const LIMIT = 10;

export async function getServerSideProps(){
  const communitiesQuery = query(
    collection(firestore, 'communities'),
    orderBy('communityName'),
    limit(LIMIT)
    )
  const communities = (await getDocs(communitiesQuery)).docs.map(communityToJSON);

  return {
    props: { communities }, // will be passed to the page component as props
  };

}

interface Props {
  communities: any 
}

export default function CommunityHome(props:Props) {
  const [communities, setCommunities] = useState(props.communities);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setCommunitiesEnd] = useState(false);

  const getMoreCommunities = async () => {
    setLoading(true);
    const lastVisible = communities[communities.length-1]; // how to set pointer pointing to the name after the one before in alphabetic
    const communitiesQuery = query(
      collectionGroup(firestore, 'communities'),
      orderBy('communityName'),
      startAfter(lastVisible),
      limit(LIMIT)
      )
    const newCommunities = (await getDocs(communitiesQuery)).docs.map((doc) => doc.data());
    setCommunities(communities.concat(newCommunities));
    setLoading(false);
    if (newCommunities.length < LIMIT) {
      setCommunitiesEnd(true);
    }
  }

  return (
      <>
        <main>
        <CommunityPage />
        <ManageCommunity communities={communities} admin={false} /> 
        <ExploreCommunity communities={communities} admin={false} /> 
    </main>
      </>
    );
}


