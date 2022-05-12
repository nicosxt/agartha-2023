
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

export default function AddMemberForm(props : any) {
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

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {        
        const docRef = doc(firestore, 'usernames', username);
        const docSnap = await getDoc(docRef)
        const exists = docSnap.exists();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);


  const onChange = (e: React.ChangeEvent<any>) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(true);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
    setMember(val);
  };
  const router = useRouter();


  // Ensure slug is URL safe
  const {slug} = props;
  // console.log("slug1"+slug)
  // console.log(post)


  const addMember = async (e:any) => {
    e.preventDefault();
    if(!isValid) {
      const user = await getUserWithUsername(member);
      const ref = doc(firestore, 'communities', slug, 'members', user.data().uid);
      await setDoc(ref, {
        username: user.data().username,
        uid: user.data().uid,
        admin: admin,
        addBy: username,
        titles: titles,
        responsibilities: responsibilities,
      }, { merge: true }
      );

      const userRef = doc(firestore, 'users', user.data().uid, 'communities', slug);
      await setDoc(userRef, {
        communitySlug: slug,
        admin: admin,
        addBy: username,
        titles: titles,
        responsibilities: responsibilities,
      }, { merge: true }
      );
      router.push(`/community/${slug}/members`);


    } else {
      window.alert("Please enter a valid username");
    }
  }

  
  return (
      <>

        <form className="py-10 space-y-8 divide-y divide-gray-200" onSubmit={addMember}>
            

          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
            <div>
              <div> 
                <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Member 📝</h3>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Member Name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={formValue}
                      onChange={onChange} 
                      placeholder="Find User"
                      type="text" name="street-address" id="street-address" autoComplete="street-address" className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"/>
                      <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

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
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Title(s) </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={titles}
                      onChange={(e) => setTitles(e.target.value)}
                      type="text" name="city" id="city" autoComplete="address-level2" className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"> Responsibilities </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input 
                      value={responsibilities}
                      onChange={(e) => setResponsibilities(e.target.value)}
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
              <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
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


function UsernameMessage(props:Props): any{
  const { loading, isValid, username } = props;

  if (loading) {
    return <p>Checking...</p>;
  } else if (!isValid) {
    return <Text color='green'>{username} does exist!</Text>;
  } else if (username.length < 3 && username.length> 0) {
    return <Text color='tomato'>{username} is too short!</Text>;
  } else if (username && isValid) {
    return <Text color='tomato'>{username} does not exist!</Text>;
  } else {
    return <p></p>;
  }
}