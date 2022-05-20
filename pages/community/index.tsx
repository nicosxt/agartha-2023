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
import Loader from '../../components/misc/loader';

const LIMIT = 5;

export async function getServerSideProps(){
  const communitiesQuery = query(
    collection(firestore, 'communities'),
    orderBy('communityName'),
    limit(LIMIT)
    )
  const communities = (await getDocs(communitiesQuery)).docs.map(communityToJSON);
  const auth = getAuth();
  const uid:string = auth?.currentUser?.uid!;
      
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
  const [adminLoading, setAdminLoading] = useState(false);
  const [communityEnd, setCommunitiesEnd] = useState(false);
  const [adminCommunityEnd, setAdminCommunityEnd] = useState(false);

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
          orderBy('communityName'),
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
          // limit(LIMIT)
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
    const last= communities[communities.length-1]; // how to set pointer pointing to the name after the one before in alphabetic
    const cursor = typeof last.communityName === 'string' ? last.communityName : last.communityName.toString();
    console.log ("cursor", cursor);
    const communitiesQuery = query(
      collection(firestore, 'communities'),
      orderBy('communityName'),
      startAfter(cursor),
      limit(LIMIT)
      )
    const newCommunities = (await getDocs(communitiesQuery)).docs.map((doc) => doc.data());
    setCommunities(communities.concat(newCommunities));
    setLoading(false);
    if (newCommunities.length < LIMIT) {
      setCommunitiesEnd(true);
    }
    // console.log("newCommunities", newCommunities);
  }

  const getMoreAdminCommunities = async () => {
    setAdminLoading(true);
    const last= adminCommunities[adminCommunities.length-1]; // how to set pointer pointing to the name after the one before in alphabetic
    const cursor = typeof last.communityName === 'string' ? last.communityName : last.communityName.toString();
    console.log ("cursor", cursor);
    //GET ADMIN COMMUNITIES
    if(uid){
      const adminCommunitiesQuery = query(
        collectionGroup(firestore, 'members'),
        where('admin', '==', true),
        where('uid', '==', getAuth().currentUser!.uid),
        orderBy('communityName'),
        startAfter(cursor),
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

        }
      })
      const newCommunities = (await getDocs(adminCommunitiesQuery)).docs.map((doc) => doc.data());
      setAdminCommunities(adminCommunities.concat(newCommunities));
      setAdminLoading(false);
      if (newCommunities.length < LIMIT) {
        setAdminCommunityEnd(true);
      }

      
    }
  }

  return ( 
      <>    
        <main>
        <CommunityPage communities={memberCommunities} /> 
        <ManageCommunity communities={adminCommunities} /> 
        <div className="min-h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              {!adminLoading && !adminCommunityEnd && 
              <button 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={getMoreAdminCommunities}>  
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Admin Communities
              </span></button>}

              <Loader show={adminLoading} />

              {adminCommunityEnd && 
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
             </div>
            </div>
        </div>


        <ExploreCommunity communities={communities} /> 
        <div className="min-h-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              {!loading && !communityEnd && 
              <button 
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={getMoreCommunities}>  
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Communities
              </span></button>}

              <Loader show={loading} />

              {communityEnd && 
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
      </>
    );
}
