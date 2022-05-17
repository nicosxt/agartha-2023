import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import React from 'react'
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { authContext } from '../../lib/authContext'
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc, getDoc, collection, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import CommunityAvatarUploader from './CommunityAvatarUploader';

export default function CommunityPostForm(props : any) {

    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { username } = useContext(authContext);
    // Set values
    const [communityName, setCommunityName] = useState('');
    const [intro, setIntro] = useState('');

    //Set addresses
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    
    // type AdminCheck = {
    //   communitySlug: string
    //   admin: boolean
    // }

    //Set community for users using slug
    // const [community, setCommunity] = useState<AdminCheck[]>([]);

    // Ensure slug is URL safe
    const {slug} = props;
    // console.log("slug1"+slug)
    // console.log(post)
    const auth = getAuth();
    const uid:string = auth?.currentUser?.uid!;

  
    const createCommunity = async (e:any) => {
        //create community and update user profile
        e.preventDefault();
        const ref = doc(firestore, "communities", slug);
        await setDoc(ref, {
            // Tip: give all fields a default value here
            communityName ,
            avatarUrl,
            city,
            country,
            state,
            slug,
            intro,

        },
        { merge: true })

        const memberRef = doc(firestore, "communities", slug, "members", uid);
        await setDoc(memberRef, {
          uid: uid,
          admin: true,
          slug: slug,
          addBy: "Genesis",
          username: username,

        })
        // Imperative navigation after doc is set
        const communitySlug:string = Array.isArray(slug)?slug[0]:slug!;

        const userCommunityRef = doc(firestore, "users", uid, "communities", communitySlug);
        // setCommunity([...community, {communityName, admin: true }]);
        // community.push({communitySlug, admin: true });
        // console.log(community)

        await setDoc(userCommunityRef, {
            communitySlug: communitySlug,
            admin: true,
            communityName: communityName,
            addBy: "Genesis",
            username: username,
        },
        { merge: true });

        router.push(`/community/${slug}`);

    };
    
    return (
        <>
          <script src="../path/to/flowbite/dist/flowbite.js"></script>
          <script src="../path/to/flowbite/dist/datepicker.js"></script>
  
          <form className="py-10 space-y-8 divide-y divide-gray-200" onSubmit={createCommunity}>
              

            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
              <div>
                <div> 
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Community Form 📝</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Community Name</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={communityName} 
                        onChange={(e) => setCommunityName(e.target.value)} 
                        placeholder="My Community"
                        type="text" name="street-address" id="street-address" autoComplete="street-address" className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                </div>
  
                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Description 👀</label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      {/* <textarea {...register("content")}  */}
                    <textarea
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        // {...register("content")}
                        id="about" name="about" rows={10} className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                    <p className="mt-2 text-sm text-gray-500">Write a few sentences about your community.</p>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Community Logo/Avatar </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <div className="space-y-1 text-center">
                          {/* <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />`
                          </svg> */}
                          <div className="flex text-sm text-gray-600">
                            <CommunityAvatarUploader slug={slug} defaultValues={null} />
                          </div>
        
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
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> City </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text" name="city" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> State / Province </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text" name="region" id="region" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Country </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text" name="country" id="country" autoComplete="country" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
                </div>

                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Contact</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Getting to know more about the specifications.</p>
                </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> City </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text" name="city" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
  
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> State / Province </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        type="text" name="region" id="region" autoComplete="address-level1" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Country </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text" name="country" id="country" autoComplete="country" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                    </div>
                  </div>
                </div>
            </div>
            </div>
    
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create New Community</button>
              </div>
            </div>
          </form>
        </>
    );
}

