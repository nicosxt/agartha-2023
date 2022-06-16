import Link from 'next/link';
import ImageFeed from '../imgs/ImageFeed';
import HeartButton from '../misc/HeartButton';
import { useRouter } from 'next/router';
import { updateDoc, serverTimestamp, deleteDoc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { getUserWithUsername } from '../../lib/firebaseConfig/init';
import {memberToJSON} from '../../lib/firebaseConfig/init'

export default function DisplayForm(props : any) {
    const post = props.post;
    const postRef = props.postRef;
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
    const postUsername = post.username
    const { username } = useContext(authContext);
    let realUsername:string = post.username!;

    let admin = false;
    if (postUsername === username){
        admin = true;
    }
    // need to make sure no one else can edit/delete the post. 
    // write an async function 
    // console.log("realUsername", realUsername);
    const [postUser, setPostUser] = useState<any>("");

    useEffect(() => {
        const getUser = async () => {
            const userDoc = await getUserWithUsername(realUsername);
            if(userDoc){
                const user = memberToJSON(userDoc);
                setPostUser(user);
            }
        }
        getUser();
    }, []);

    // console.log("postUser", postUser);

    return(
        <>
            <div className="py-10 space-y-8 divide-y divide-gray-200 md:space-x-5 lg:max-w-7xl lg:px-8 md:items-center md:justify-between max-w-3xl mx-auto px-4 sm:px-6 ">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{post?.title}</h3>

               
                <div className="mt-8 items-center flex px-4">
                <Link href={`/${post.username}/`}>
                <a>
                <img className="h-16 w-16 rounded-full btn" src={postUser.avatarUrl? postUser.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
                </a>
                </Link>
                <div className="ml-3">
                <p className="mt-1 max-w-2xl text-sm text-gray-500">by{' '}

<Link href={`/${post.username}/`}>

    <a className="text-info"><strong>@{post.username}</strong></a>
</Link>{' '}
on {createdAt.toISOString()}</p>

                    </div>

            </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.content}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Avability</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.movein} to {post?.moveout}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.price} {post?.currency} per night</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.street}, {post?.city}, {post?.state}, {post.country}, {post.zipcode}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                    <dt className="text-sm font-medium text-gray-500">Photos</dt>
                    <dd className="grid flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ImageFeed urls={post.images}/>
                    </dd>

                   
                </div>
                </dl>
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
            {admin && (<>
                <Link href={`/${username}/exchange`}>
                <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Back</button>
                </Link>
                <Link href={`/admin/${post.slug}`}>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</button>
                </Link>

                <DeletePostButton postRef={postRef} />
                </>
                )}
              </div>
            </div>
     
            

            </div>

        </>
    );

}

function DeletePostButton(props:any):any {
    const {postRef} = props;
    const router = useRouter();
    const deletePost = async () => {
      const doIt = confirm('are you sure!');
      if (doIt) {
        await deleteDoc(postRef);
        router.push('/admin');
      }
    }
    return(
    <button type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          onClick={deletePost}>Delete</button>
    );
  }