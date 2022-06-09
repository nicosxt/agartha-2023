import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useContext, useState } from 'react';
import { doc, getDoc, startAfter, collection, collectionGroup, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../../lib/firebaseConfig/init'
import { authContext } from '../../../lib/authContext'
import { getUserWithUsername, communityToJSON } from '../../../lib/firebaseConfig/init';
import { useEffect } from "react";
import CommunityStack from "../../../components/communities/CommunityStack";
import React from 'react'

const LIMIT = 5;

export async function getServerSideProps(context:any){
  const {query:qr} = context;
  const {username} = qr;
  // console.log("username",username);
  const userDoc = await getUserWithUsername(username)

  if (!userDoc) {
      return {
          notFound: true,
      };
  }
  let user;  
  let memberCommunities=null;
  let check=0;
  let slugs:any = [];


  if (userDoc) {
      user = userDoc.data();
      const uid = user.uid!
      const memberCommunitiesQuery = query(
        collectionGroup(firestore, 'members'), //fetch all communities that the user is a member of
        where('uid', '==', uid),
        // limit(LIMIT)
      )
      const memberDocs = await getDocs(memberCommunitiesQuery);
      memberDocs.docs.map(communityToJSON).map(async (memberDoc) => {
        const communitySlug = memberDoc.slug;
        slugs.push(communitySlug);
      })
      if(slugs.length > 0){
        const communityQuery = query(collection(firestore, 'communities'),where('slug','in',slugs))
        memberCommunities= (await getDocs(communityQuery)).docs.map(communityToJSON);
      }
  }

      
  return {
    props: {
      user,
      memberCommunities,
      username,

    }
  }
}
  

interface Props {
  // communities: any 
  memberCommunities: any
  // adminCommunities: any
  username: any
  user: any
  check: any
  slugs: any
}

export default function CommunityHome(props:Props) {
  const [memberCommunities, setMemberCommunities] = useState<any>(props.memberCommunities);
  const username = props.username;

  return ( 
      <>    
         <div className="min-h-full">
        <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500 ">Communities</h1>
        <p className="text-sm text-center font-medium text-gray-500">Communities that you are a part of.</p>
           <div className="mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/>
           {memberCommunities && 
           <CommunityStack communities={memberCommunities} username={username}/>
            }
            </div>
        
      </>
    );
}
