
import { authContext } from '../../lib/authContext'
import { useContext, useState } from 'react';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from 'react-hook-form';
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import {Text} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import React, { useEffect, useCallback } from 'react';
import { getUserWithUsername } from '../../lib/firebaseConfig/init';
import Link from 'next/dist/client/link';
export default function JoinCommunityForm(props : any) {
  const [formValue, setFormValue] = useState(''); //user enter name 
  // Set values
  const [member, setMember] = useState('');
  const { username } = useContext(authContext);
  const [reference, setReference] = useState('');
  const [reason, setReason] = useState('');


  const router = useRouter();

  const {slug} = props;
  let realUsername:string = username!;


  const joinCommunity = async (e:any) => {
    e.preventDefault();
    const user = await getUserWithUsername(realUsername);
    const ref = doc(firestore, 'communities', slug, 'requests', user.data().uid);
    const communityRef = doc(firestore, 'communities', slug);
    const communityDoc = await getDoc(communityRef);
    const communityName = communityDoc.data()?.communityName;

    await setDoc(ref, {
        username: user.data().username,
        uid: user.data().uid,
        reference: reference,
        reason: reason,
        slug: slug,
        communityName: communityName,
        }, { merge: true }
    );
    router.push(`/${username}/community/${slug}/members`);

  }

  
  return (
      <>

        <form className="py-10 space-y-8 divide-y divide-gray-200" onSubmit={joinCommunity}>
            

          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
            <div>
              <div> 
                <h3 className="text-lg leading-6 font-medium text-gray-900">Join Community 📝</h3>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Username </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={realUsername?realUsername:'N/A'}
                      readOnly={true}
                      type="text" name="region" id="region" autoComplete="address-level1" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                    <p className="mt-2 text-sm text-gray-500">This is a readonly field showing your username.</p>
                  </div>
                </div>
              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Do you know anyone in this community?</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      type="text" name="city" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Reason for joining? </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      type="text" name="region" id="region" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

          </div>
          </div>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <Link href={`/${username}/community/${slug}/members`}>
              <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
              </Link>
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
            </div>
          </div>
        </form>
      </>
  );
}
