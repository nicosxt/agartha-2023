
import { authContext } from '../../lib/authContext'
import { useContext, useState } from 'react';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from 'react-hook-form';
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import {Text} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import React, { useEffect, useCallback } from 'react';
import { getUserWithUsername } from '../../lib/firebaseConfig/init';
import Link from 'next/dist/client/link';
import { useAuth } from '../../lib/authContext'

export default function EditMemberForm(props : any) {
    const {username } = useAuth();
    const {defaultValues, slug} = props;
    const router = useRouter();
    const { register, handleSubmit, reset, watch, formState, setError } = useForm({ defaultValues, mode: 'onChange' });

    const memberRef = doc(firestore, "communities", slug, "members", defaultValues.uid);
    const communityRef = doc(firestore, "users", defaultValues.uid, "communities", slug);
    const updateMember= async (data:any) => {
        const { admin, titles, responsibilities} = data;

        await updateDoc(memberRef, {
            // Tip: give all fields a default value here
            admin,
            responsibilities,
            titles,
        });       

        await updateDoc(communityRef, {
            admin,
            titles,
            responsibilities,
        });
        
        reset({ admin, titles, responsibilities});
        router.push(`${username}/community/${slug}/members`);

    };
  
  return (
      <>

        <form className="py-10 space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(updateMember)}>
            

          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
            <div>
              <div> 
                <h3 className="text-lg leading-6 font-medium text-gray-900">Update Member 📝</h3>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Member Name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      readOnly={true}
                      placeholder={defaultValues.username}
                      type="text" name="street-address" id="street-address" autoComplete="street-address" className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                  </div>
              </div>
              <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="admin"
            aria-describedby="comments-description"
            type="checkbox"
            {...register("admin")}
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
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Title(s) </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      {...register("titles")}
                      type="text" id="titles" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Responsibilities </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      {...register("responsibilities")}
                      type="text" id="responsibilities" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Added By </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      placeholder={defaultValues.addBy}
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
              <Link href={`${username}/community/${slug}/members`}>
              <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
              </Link>
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Member Info</button>
              <DeleteMemberButton memberRef={memberRef} slug={slug}/>
            </div>
          </div>
        </form>
      </>
  );
}

function DeleteMemberButton(props:any):any {
  const {memberRef, slug} = props;
  const router = useRouter();
  const {username} = useAuth();
  const deleteMember = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await deleteDoc(memberRef);
      router.push(`${username}/community/${slug}/members`);
    }
  }
  return(
    // <Link href={`/community/${slug}/members`}>

  <button type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
        onClick={deleteMember}>Delete Member</button>
  // </Link>
  );
}



