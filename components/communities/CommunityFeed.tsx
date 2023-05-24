import Link from 'next/link';
import { Container } from '@mui/material'
import { useEffect, useState} from 'react';
import { getCommunityWithSlug, communityToJSON, memberToJSON, postToJSON } from '../../lib/firebaseConfig/init';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import {firestore} from '../../lib/firebaseConfig/init';
import PostContent from '../../components/users/PostContent'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import CommunityProfilePage from '../../components/communities/CommunityProfilePage';
import PostFeed from '../../components/users/PostFeed';
import MemberStack from '../../components/members/MemberStack';
import MemberAvatarStackSmall from '../../components/members/MemberAvatarStackSmall';

interface Props {
    communities: any
    username: any
}

export default function CommunityFeed(props: Props): any {
    const {communities, username} = props;
    return communities ? communities.map((community:any) =><Community community={community} username={username} key={community.slug} />) : null;
}

interface PostProps{
    community: any
    username: any
}

function Community(props: PostProps) : any {
    const community = props.community;
    const username = props.username;
    const slug = community.slug;
    const [membersInfo, setMembersInfo] = useState<any>();
    let membersSnapshot;
    let members;
    let temp :any[] = [];
    let newMembersInfo:any[] = [];

    useEffect (() => {
        const getMember = async () => {
            const communityQuery= query(collection(firestore, "communities", slug, "members"));
            membersSnapshot = await getDocs(communityQuery);
            if(membersSnapshot){
                members = membersSnapshot.docs.map(d => d.id);
                members = members.filter((v:any, i:any, a:any) => a.indexOf(v) === i);
                temp = [...members];
                while(members.length){
                    const batch = members.splice(0, 10);
                    const membersQuery = query(collection(firestore, "users"), where("uid", "in", [...batch]))
                    newMembersInfo.push(...(await getDocs(membersQuery)).docs.map(memberToJSON));
                }
                if(newMembersInfo){
                    setMembersInfo(newMembersInfo);
                }
            }
        }
        getMember();
    }, [membersSnapshot]);
        
    return <>
      <div className="mt-8 max-w-3xl mx-auto gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <ul role="list" className="divide-y divide-gray-200">
              <li>
              <Link
                  href={`/${username}/community/${community.slug}`}
                  className="block hover:bg-gray-50">

                  <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                      <div className="flex text-sm">
                          <a>
                          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{community.communityName}</p>
                          </a>
                      </div>
                      <div className="flex space-x-4">
                       
                      </div>

                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex overflow-hidden -space-x-1">
                          <MemberAvatarStackSmall membersInfo={membersInfo}/>
                      </div>
                      </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                  </div>
                  </div>

              </Link>

          </li>
        </ul>
      </div>
      </div>

  </>;


}