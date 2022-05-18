import { authContext } from '../../lib/authContext'
import { useContext, useState } from 'react';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from 'react-hook-form';
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'

import { useRouter } from 'next/router';
import AvatarUploader from './AvatarUploader';

export default function EditUserProfile(props : any) {
    const {userRef, defaultValues, username} =props;
    const router = useRouter();
    const { register, handleSubmit, reset, watch, formState, setError } = useForm({ defaultValues, mode: 'onChange' });

    const updatePost = async (data:any) => {
        const {
            discord, email, instagram, movein, intro,
            twitter, website, wechat} = data;

        await updateDoc(userRef, {
            // Tip: give all fields a default value here
            discord,
            email,
            instagram,
            intro,
            twitter,
            website,
            wechat,
        },
        )
        reset({ discord, email, instagram, movein, intro,
          twitter, website, wechat});
        router.push(`/${username}`);

    };
    return (
        <>
          <form className="space-y-8 divide-y divide-gray-200"  onSubmit={handleSubmit(updatePost)}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 md:ml-10 pt-8">
              <div>
                <div> 
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Profile📝</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>
                
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Username</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("username")}
                        readOnly = {true} 
                        placeholder={username}
                        type="text" id="username" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                      <p className="mt-2 text-sm text-gray-500">Username is unchangeable.</p>
                    </div>
                </div>
  
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        
                        <label htmlFor="intro" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Intro 👀</label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea
                            {...register("intro")}
                            id="intro" rows={10} className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                        <p className="mt-2 text-sm text-gray-500">Tell us more about yourself!</p>
                        </div>
                    </div>
    
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Change Your Avatar </label>
                    
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">

                                    <div className="flex text-sm text-gray-600">
                                        <AvatarUploader />
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>
  
              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Contact</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Let us connect!</p>
                </div>
  
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Instagram </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      {...register("instagram")}
                      type="text" id="instagram" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Twitter </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("twitter")}
                        type="text" id="twitter" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Website </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("website")}
                        type="text" id="website" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="discord" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Discord Handle </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("discord")}
                        type="text" id="discord" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="wechat" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> WeChat</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("wechat")}
                        type="text" id="wechat" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Email</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                  
                        {...register("email")}
                        readOnly = {true} 
                        type="text" id="email" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                        <p className="mt-2 text-sm text-gray-500">Email is your sign-in email, which is also unchangeable.</p>
                    </div>
                  </div>

                </div>
            </div>
  
            <div className="pt-5">
              <div className="flex justify-end">
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Changes</button>
              </div>
            </div>
          </form>

        </>
    );

}
