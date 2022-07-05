
import { authContext } from '../../lib/authContext'
import { useContext, useState } from 'react';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import {Text} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import React, { useEffect, useCallback } from 'react';
import { getUserWithUsername } from '../../lib/firebaseConfig/init';
import Link from 'next/dist/client/link';

export default function ApproveMemberForm(props : any) {
  const [formValue, setFormValue] = useState(''); //user enter name 
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);
  // Set values
  const [member, setMember] = useState('');
  const [admin, setAdmin] = useState(false);
  const { username } = useContext(authContext);
  const [addBy, setAddBy] = useState('');
  const [titles, setTitles] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [reference, setReference] = useState('');
  const [reason, setReason] = useState('');

  const router = useRouter();


  const {slug, uid} = props;
//   console.log(uid)
  // check if requests document exits or not, if so set reference and reason. 


  let newMemberUsername;

  useEffect(() =>  {
    const getUsername = async () => {

        if(uid){
          const newMemberRef = doc(firestore, 'users', uid);
          const newMemberDoc = await getDoc(newMemberRef);
          if(newMemberDoc){
            newMemberUsername = newMemberDoc.data()?.username;
            setMember(newMemberUsername);
          }
          const request = doc(firestore, 'communities', slug, 'requests', uid);
          const requestDoc = await getDoc(request);
          if(requestDoc){
            setReference(requestDoc.data()?.reference);
            setReason(requestDoc.data()?.reason);
          }

        }
        
      }
    getUsername();
    }, []);



  const addMember = async (e:any) => {
    e.preventDefault();
   
      const user = await getUserWithUsername(member);
      const ref = doc(firestore, 'communities', slug, 'members', user.data().uid);
      const communityRef = doc(firestore, 'communities', slug);
      const communityDoc = await getDoc(communityRef);
      const communityName = communityDoc.data()?.communityName;

      await setDoc(ref, {
        username: user.data().username,
        uid: user.data().uid,
        admin: admin,
        addBy: username,
        reference: reference,
        reason: reason,
        // titles: titles,
        // responsibilities: responsibilities,
        slug: slug,
        communityName: communityName,
      }, { merge: true }
      );

      const userRef = doc(firestore, 'users', user.data().uid, 'communities', slug);
      await setDoc(userRef, {
        communitySlug: slug,
        admin: admin,
        addBy: username,
        reference: reference,
        reason: reason,
        // titles: titles,
        // responsibilities: responsibilities,
        communityName: communityName,
      }, { merge: true }
      );
      const userRequestRef = doc(firestore, "communities", slug, "requests", uid);
    //   console.log(slug, uid)
      await deleteDoc(userRequestRef);
      router.push(`/${username}/community/${slug}/members`);



    }

  
  return (
      <>

        <form className="py-10 space-y-8 divide-y divide-gray-200" onSubmit={addMember}>
            

          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
            <div>
              <div> 
                <h3 className="text-lg leading-6 font-medium text-gray-900">Approve New Member 📝</h3>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Member Name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={member?member:'N/A'}
                      readOnly={true}
                      type="text" name="region" id="region" autoComplete="address-level1" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                    <p className="mt-2 text-sm text-gray-500">This is a readonly field showing your username.</p>
                  </div>

              </div>
              <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            onClick={() => setAdmin(!admin)}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            Admin Role
          </label>
          <p id="comments-description" className="text-gray-500">
            By Checking this box, you will give this member permission to edit the community page.
          </p>
        </div>
    
      
      
      </div>
    </fieldset>

              <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
         

            </div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Other relevant information.</p>
              </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Reference </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      type="text" name="city" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Reason</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      type="text" name="region" id="region" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Added By </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={username?username:'N/A'}
                      readOnly={true}
                      type="text" name="region" id="region" autoComplete="address-level1" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                    <p className="mt-2 text-sm text-gray-500">This is a readonly field showing your username.</p>
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
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add New Member</button>
            </div>
          </div>
        </form>
      </>
  );
}

interface Props {
  username: string
  isValid: boolean
  loading: any
}

