import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useContext, useState } from 'react';
import { doc, getDoc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../../lib/firebaseConfig/init'
import { authContext } from '../../../lib/authContext'
import { getUserWithUsername, communityToJSON } from '../../../lib/firebaseConfig/init';
import React from 'react'
import ManageCommunity from "../../../components/communities/ManageCommunity";
import Loader from '../../../components/misc/loader';
import Link from 'next/link'
import CommunityFeed from "../../../components/communities/CommunityFeed";
const LIMIT = 5;

export async function getServerSideProps(context:any){
  const {query:qr} = context;
  const {username} = qr;
  const userDoc = await getUserWithUsername(username)
  if (!userDoc) {
      return {
          notFound: true,
      };
  }
  let user = null;  
  let adminCommunities:any = [];

  if (userDoc) {
      user = userDoc.data();
      const uid = user.uid!
      const adminCommunitiesQuery = query(
        collectionGroup(firestore, 'members'), //fetch all communities that the user is an admin of
        where('admin', '==', true),
        where('uid', '==', uid),
        limit(LIMIT)
      )
      const adminDocs = await getDocs(adminCommunitiesQuery);
      adminDocs.docs.map(async (adminDoc) => {
        const communitySlug = adminDoc.data().slug;
        const communityQuery = doc(firestore, 'communities', communitySlug)
        
        const community = communityToJSON(await getDoc(communityQuery));
        if (community) {
          adminCommunities.push(community);
        }
      })
  }
  
  const communitiesQuery = query(
    collection(firestore, 'communities'),
    orderBy('communityName'),
    limit(LIMIT)
    )
  const communities = (await getDocs(communitiesQuery)).docs.map(communityToJSON);
      
  return {
    props: {
      adminCommunities,
      username
    }
  }
}
  

interface Props {
  adminCommunities: any
  username: any
}

export default function CommunityHome(props:Props) {
  const username = props.username;
  const [adminCommunities, setAdminCommunities] = useState<any>(props.adminCommunities);

  const [adminLoading, setAdminLoading] = useState(false);
  const [adminCommunityEnd, setAdminCommunityEnd] = useState(false);
  const {uid} = useContext(authContext);

  const getMoreAdminCommunities = async () => {
    setAdminLoading(true);
    const last= adminCommunities[adminCommunities.length-1]; // how to set pointer pointing to the name after the one before in alphabetic
    const cursor = typeof last.communityName === 'string' ? last.communityName : last.communityName.toString();
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
        <div className="min-h-full">
        <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600">Manage Communities</h1>
        <p className="text-sm text-center font-medium text-gray-500">Communities that you have admin access to.</p>
        
           <div className="mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/>
           <Link href='/communityAdmin'>

           <button 
            className=" w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 hover:scale-105"

                   >
                         <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              + Create a New Community
              </span>
    </button>
    </Link>
        <CommunityFeed username={username} communities={adminCommunities}/>

        <div className="mt-8 min-h-full">
              {!adminLoading && !adminCommunityEnd && adminCommunities.length > 0 &&
              <button 
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={getMoreAdminCommunities}>  
                <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Admin Communities
              </span></button>}

              <Loader show={adminLoading} />

              {(adminCommunityEnd || adminCommunities.length===0 ) && 
              <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
             </div>
            </div>
      
    </main>
      </>
    );
}
