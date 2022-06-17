import {communityToJSON, firestore, postToJSON} from '../../lib/firebaseConfig/init';
import Link from 'next/link';
import { query, doc, getDoc, deleteDoc} from 'firebase/firestore';
import { useAuth } from '../../lib/authContext';
import { useContext, useState, useEffect} from 'react';
import { authContext } from '../../lib/authContext'
import { useRouter } from 'next/router';

interface Props {
    requests: any
    slug: string
    admin: boolean
}

export default function RequestFeed(props: Props): any {
    const {requests, slug, admin} = props;
    return requests ? requests.map((request:any) =><RequestTable request={request} key={slug} admin={admin} slug={slug}/>) : null;
}

interface PostProps{
    request: any
    slug: string
    admin: boolean
}

function RequestTable(props: PostProps) {
    const request = props.request;
    const admin = props.admin;
    const slug = props.slug; // the slug is community slug 
    const userRef = doc(firestore, "users", request.uid);
    const [userDoc, setUserDoc] = useState<any>()
    // find community where slug equals slug
    // then assign the value of admin in that set to the variable
    useEffect(() => {
        const getData = async () => {
            const data = await getDoc(userRef)
            setUserDoc(communityToJSON(data))
        }
        getData()
    }, [])
    // admin = userDoc?.admin;


    return (
      <>
      <MemberItem request={request} admin={admin} slug={slug} userDoc={userDoc}/>
    </>
    );


}

interface MemberProps{
  request: any
  admin: boolean
  userDoc: any
  slug: string 
}
function MemberItem(props: MemberProps) {
  const request = props.request;
  const admin = props.admin;
  const userDoc = props.userDoc;
  const slug = props.slug;
  // const username = useAuth();
  const { username } = useContext(authContext);
  let realUsername:string = username!;


  return (
    
    <>
    {userDoc &&( 
      <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                <Link href={`/${request.username}`}>
                <a>

                  <img className="h-10 w-10 rounded-full" src={userDoc.avatarUrl? userDoc.avatarUrl :"https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" } alt=""/>
                  </a>

                  </Link>

                </div>
                <div className="ml-4">
                  <Link href={`/${request.username}`}>
                    <a>
                  <div className="font-medium text-gray-900">{request.username}</div>
                  </a>
                  </Link>
                  <div className="text-gray-500">{userDoc.email}</div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div className="text-gray-900">{request.reference}</div>
              {/* <div className="text-gray-500">{request.reason}</div> */}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{request.reason}</td>

            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {admin && (
              <Link href={`/${realUsername}/community/${slug}/members/approve/${request.uid}`}>
                <a className="text-green-600 hover:text-green-900">Approve</a>
                </Link>           
              )}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {admin && (
              <DeleteRequestButton uid={request.uid} slug={slug} username={username}/>
              // <Link href={`/${username}/community/${slug}/members/${request.uid}`}>
              // <a className="text-red-600 hover:text-red-900">Decline</a>
              // </Link>
            )}
            </td>
          </tr>

        </tbody>
        )}
    </>
  );
}



function DeleteRequestButton(props:any):any {
  const {uid, slug, username} = props;

  const userRequestRef = doc(firestore, "communities", slug, "requests", uid);
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await deleteDoc(userRequestRef);
      router.push(`/${username}/community/${slug}/members`);
    }
  }
  return(
  <button type="button" className="text-red-600 hover:text-red-900" 
        onClick={deletePost}>Decline</button>
  );
}