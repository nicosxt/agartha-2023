import {communityToJSON, firestore, postToJSON} from '../../lib/firebaseConfig/init';
import Link from 'next/link';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/authContext';

interface Props {
    members: any
    slug: string
    admin: boolean
}

export default function MemberFeed(props: Props): any {
    const {members, slug, admin} = props;
    return members ? members.map((member:any) =><MemberTable admin={admin} member={member} key={slug} slug={slug}/>) : null;
}

interface PostProps{
    member: any
    slug: string
    admin: boolean
}

function MemberTable(props: PostProps) {
    const member = props.member;
    const slug = props.slug; // the slug is community slug 
    const userCommunityRef = doc(firestore, "users", member.uid, "communities", slug);
    const admin = props.admin;
    const [userCommunityDoc, setUserCommunityDoc] = useState<any>()
    let memberAdmin = false;
    // find community where slug equals slug
    // then assign the value of admin in that set to the variable
    useEffect(() => {
        const getData = async () => {
            const data = await getDoc(userCommunityRef)
            setUserCommunityDoc(communityToJSON(data))
        }
        getData()
    }, [])
    memberAdmin = userCommunityDoc?.admin;

    return (
      <>
      <MemberItem member={member} admin={admin} memberAdmin={memberAdmin} slug={slug} userDoc={userCommunityDoc}/>
    </>
    );


}

interface MemberProps{
  member: any
  admin: boolean
  userDoc: any
  slug: string 
  memberAdmin: boolean
}
function MemberItem(props: MemberProps) {
  const member = props.member;
  const admin = props.admin;
  const userDoc = props.userDoc;
  const slug = props.slug;
  const username = useAuth();
  const memberAdmin = props.memberAdmin;

  return <>
  {userDoc &&( 
    <tbody className="divide-y divide-gray-200 bg-white">
        <tr>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
              <Link href={`/${member.username}`}>

                <img className="h-10 w-10 rounded-full" src={member.avatarUrl?member.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg"} alt=""/>

              </Link>

              </div>
              <div className="ml-4">
                <Link href={`/${member.username}`}>

                  <div className="font-medium text-gray-900">{member.username}</div>

                </Link>
                <div className="text-gray-500">{member.email}</div>
              </div>
            </div>
          </td>
          
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {userDoc?.reference && (
            <div className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{userDoc?.reference}</div>
            )}
            {!userDoc?.reference && (
              <div className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">{'n/a'}</div>

            )}

            {/* <div className="text-gray-500">{userDoc?.responsibilities}</div> */}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{memberAdmin? "Admin" : 'Member'}</td>

          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{userDoc.addBy}</span>
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            {admin && (
            <Link
              href={`/${username}/community/${slug}/members/${member.uid}`}
              className="text-indigo-600 hover:text-indigo-900">
            Edit
            </Link>
            )}
          </td>
        </tr>

      </tbody>
      )}
  </>;
}
