import { useContext, useState } from 'react';
import { doc, getDoc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../../lib/firebaseConfig/init'
import { getUserWithUsername, communityToJSON } from '../../../lib/firebaseConfig/init';
import React from 'react'
import CommunityFeed from "../../../components/communities/CommunityFeed";
import Loader from '../../../components/misc/loader';
const LIMIT = 5;

export async function getServerSideProps(context:any){

  const communitiesQuery = query(
    collection(firestore, 'communities'),
    orderBy('communityName'),
    limit(LIMIT)
    )
  const communities = (await getDocs(communitiesQuery)).docs.map(communityToJSON);
      
  return {
    props: {
      communities,
      username: context.params.username
    }
  }
}
  

interface Props {
  communities: any 
  memberCommunities: any
  adminCommunities: any
  username: any
}

export default function CommunityHome(props:Props) {
const { username } = props;
  const [communities, setCommunities] = useState(props.communities);
  const [loading, setLoading] = useState(false);
  const [communityEnd, setCommunitiesEnd] = useState(false);
  const getMoreCommunities = async () => {
    setLoading(true);
    const last= communities[communities.length-1]; // how to set pointer pointing to the name after the one before in alphabetic
    const cursor = typeof last.communityName === 'string' ? last.communityName : last.communityName.toString();
    // console.log ("cursor", cursor);
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
  }

  return ( 
      <>    
        <div className="min-h-full">

        <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">Explore Communities</h1>
        <p className="text-sm text-center font-medium text-gray-500">Explore IRL communities around the world.</p>
           <div className=" mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/>
           
<CommunityFeed username={username} communities={communities}/>

     
<div className="mt-8 min-h-full">
              {!loading && !communityEnd && 
              <button 
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={getMoreCommunities}>  
                <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Communities
              </span></button>}

              <Loader show={loading} />

              {(communityEnd || communities.length === 0 )&&
              <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
             </div>
        </div>

      </>
    );
}
