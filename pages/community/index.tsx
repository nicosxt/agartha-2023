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
  const auth = getAuth();
  const uid:string = auth?.currentUser?.uid!;
  // const [adminCommunities, setAdminCommunities] = useState<any>([]);

  // console.log("uid", uid);
  // if(uid){
  //   const adminCommunitiesQuery = query(
  //     collectionGroup(firestore, 'members'),
  //     where('admin', '==', true),
  //     where('uid', '==', getAuth().currentUser!.uid),
  //     // orderBy('communityName'), need to figure out how to order by communityName since community name is not recorded, and also that it needs to update all places when we update the name of the community
  //     limit(LIMIT)
  //   )
  //   const adminDocs = await getDocs(adminCommunitiesQuery);
  //   adminDocs.docs.map(async (memberDoc) => {
  //     const communitySlug = memberDoc.data().slug;
  //     // console.log("communitySlug" ,communitySlug);
  //     const communityQuery = doc(firestore, 'communities', communitySlug)
      
  //     const community = communityToJSON(await getDoc(communityQuery));
  //     if (community) {
  //       adminCommunities.push(community);
  //       // console.log("community", community);
  //     }
  //   })
  //   // setAdminCommunities(adminCommunitiesSet);
  // }
  
  
      
  return {
    props: {
      communities,
      // adminCommunities
    }
  }
}
  

interface Props {
  communities: any 
  adminCommunities: any
}

export default function CommunityHome(props:Props) {
  const [communities, setCommunities] = useState(props.communities);
  const initialArray:any = [];
  const [adminCommunities, setAdminCommunities] = useState<any>(initialArray);
  const [memberCommunities, setMemberCommunities] = useState<any>(initialArray);

  const [loading, setLoading] = useState(false);
  const [postsEnd, setCommunitiesEnd] = useState(false);
  let check;


  const {uid} = useContext(authContext);
  console.log("uid1", uid);
  // query snapshot, for each member doc, push community id, then query for each community id, push to adminCommunities

  useEffect(() => {
    console.log("uid3", uid);

    const getAdminCommunities = async () => {
      if(uid){
        const adminCommunitiesQuery = query(
          collectionGroup(firestore, 'members'),
          where('admin', '==', true),
          where('uid', '==', getAuth().currentUser!.uid),
          // orderBy('communityName'), need to figure out how to order by communityName since community name is not recorded, and also that it needs to update all places when we update the name of the community
          limit(LIMIT)
        )
        const adminDocs = await getDocs(adminCommunitiesQuery);
        adminDocs.docs.map(async (memberDoc) => {
          const communitySlug = memberDoc.data().slug;
          // console.log("communitySlug" ,communitySlug);
          const communityQuery = doc(firestore, 'communities', communitySlug)
          
          const community = communityToJSON(await getDoc(communityQuery));
          if (community) {
            setAdminCommunities((prevState:any) => [...prevState, community]);
            // const newAdminCommunites = [...adminCommunities, community];
            // setAdminCommunities(newAdminCommunites);
            // forceUpdate();
            // console.log("community", community);
          }
        })

        // GET MEMBER COMMUNITIES
        const memberCommunitiesQuery = query(
          collectionGroup(firestore, 'members'),
          where('uid', '==', getAuth().currentUser!.uid),
          limit(LIMIT)
        )
        const memberDocs = await getDocs(memberCommunitiesQuery);
        memberDocs.docs.map(async (memberDoc) => {
          const communitySlug = memberDoc.data().slug;
          // console.log("communitySlug" ,communitySlug);
          const communityQuery = doc(firestore, 'communities', communitySlug)
          
          const community = communityToJSON(await getDoc(communityQuery));
          if (community) {
            setMemberCommunities((prevState:any) => [...prevState, community]);
          }
        })
      }
    }
    getAdminCommunities();

  }, [uid]);

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
        <CommunityPage communities={memberCommunities} /> 
        <ManageCommunity communities={adminCommunities} /> 
        <ExploreCommunity communities={communities} /> 
    </main>
      </>
    );
}


