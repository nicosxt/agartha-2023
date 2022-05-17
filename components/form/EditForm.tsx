import { useForm } from 'react-hook-form';
import { updateDoc, serverTimestamp, deleteDoc, getDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ImageUploader from '../users/ImageUploader';
import Image from 'next/image';
import ImageUrlFeed from '../imgs/ImageUrlFeed';

export default function EditForm(props : any) {
    const {defaultValues, postRef, preview} =props;
    const { username } = useContext(authContext);
    const router = useRouter();
    const slug = defaultValues.slug
    console.log(defaultValues)
    // let exist = false;
    // Set values
    const { register, handleSubmit, reset, watch, formState, setError } = useForm({ defaultValues, mode: 'onChange' });

    // useEffect(() => {
    //   const checkExistence = async () => {
    //     const docSnap = await getDoc(postRef);
    //     exist =docSnap.exists();
    //   }
    //   checkExistence();
    // }, [])

    const updatePost = async (data:any) => {
      console.log('form submitted')
        const {
            content, title, published, movein, moveout,
            street, city, state, zipcode, price, currency, country} = data;
        await updateDoc(postRef, {
            // Tip: give all fields a default value here
            title: city+', '+ state+', ' +country+ ', '+zipcode + ' | ' + movein + ' to ' + moveout ,
            movein,
            moveout,
            country,
            street,
            city,
            state,
            zipcode,
            price,
            currency,
            published,
            content,
            updatedAt: serverTimestamp(),

        },
        )
        reset({  content, title, published, movein, moveout,
            street, city, state, zipcode, price, currency, country });

        router.push(`/${username}/${slug}`);

        

    };
    return (
        <>
          <script src="../path/to/flowbite/dist/flowbite.js"></script>
          <script src="../path/to/flowbite/dist/datepicker.js"></script>
          <form className="py-10 space-y-8 divide-y divide-gray-200"  onSubmit={handleSubmit(updatePost)}>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 md:ml-10 pt-8">
              <div>
                <div> 
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Exchange Form 📝</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Title</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("title")}
                        readOnly = {true} 
                        placeholder="E.g. New York City, New York, U.S., 11215 | Aug.1st - Aug.15th, 2022"
                        type="text" id="street-address" autoComplete="street-address" className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                      <p className="mt-2 text-sm text-gray-500">Title will be automatically generated based on your input.</p>
                    </div>
                </div>
  
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Description 👀</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <textarea
                        {...register("content")}
                        type="text" id="about" rows="20" className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                    <p className="mt-2 text-sm text-gray-500">Write a few sentences about what your room looks like, <br/> and why you want to rent your room.</p>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Cover photo </label>
                   
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {/* <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg> */}
                          <div className="flex text-sm text-gray-600">
                            <ImageUploader slug={slug} username={username} defaultValues={defaultValues}/>
                          </div>
                          {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                          {/* {defaultValues?.images} */}
                          <ImageUrlFeed urls={defaultValues.images}/>
                          {/* {defaultValues?.images?.map((image:string)=> {
                            <p>
                              <a href={image}> {image} </a>
                            </p>
                         })} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Getting to know more about the specifications.</p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Availiability </label>
                    <div date-rangepicker="true" className="flex items-center">
                      <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </div>
                            <input 
                                {...register("movein")}
                                type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                        </div>
                      <span className="mx-4 text-gray-500">to</span>
                      <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <input
                            {...register("moveout")}
                            type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                    </div>
                    </div>
                  </div>
  
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Street address </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("street")}
                        type="text" id="street-address" autoComplete="street-address" className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">You could also leave an approximate address to protect your privacy.</p>
  
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> City </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("city")}
                        type="text" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> State / Province </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("state")}
                        type="text" id="region" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> ZIP / Postal code </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("zipcode")}
                        type="text" id="postal-code" autoComplete="country" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Country </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        {...register("country")}
                        type="text" autoComplete="postal-code" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Price per night </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div>
                        {/* <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label> */}
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">💰</span>
                          </div>
                          <input 
                            {...register("price")}
                            type="number" min="0.01" step="0.01" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00"/>
                          <div className="absolute inset-y-0 right-0 flex items-center">
                            <label htmlFor="currency" className="sr-only">Currency</label>
                            <select 
                                {...register("currency")}
                                id="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                              <option>Select Currency</option>

                              <option>USD</option>
                              <option>CAD</option>
                              <option>EUR</option>
                              <option>GBP</option>
                              <option>RMB</option>
                            </select>
                        </div>
                      </div>
                    </div>
  
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  </div>
                  </div>
  
              
                  </div>
                </div>
            </div>       
            </div>
  
            <div className="pt-5">
              <div className="flex justify-end">
            
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><input type="checkbox" {...register("published")} /> Published</button>
                {/* <Link href={`/${username}/${defaultValues.slug}`}> */}
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Changes</button>
                {/* </Link> */}
                <DeletePostButton postRef={postRef} />
              </div>
            </div>
          </form>
      
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