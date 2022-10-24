import { firestore } from '../../lib/firebaseConfig/init'
import { doc, getDoc, collection, addDoc, setDoc,updateDoc} from 'firebase/firestore';
import { useContext, useState } from 'react';

export default function Subscription() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const postEmailToDatabase= async (e:any) => {

        e.preventDefault();
        const ref = doc(firestore, "subscriptions", email);
        await setDoc(ref, {
            email
            },
            { merge: true }
            )
        setSubscribed(true);

    }
    return (
        <div className="flex flex-col items-center justify-center mt-6 py-2">
      <div className="bg-white border-[#0000FF] border-2 w-1/2 ">
        <div className=" px-2 sm:px-2 lg:flex lg:items-center lg:py-2 lg:px-2">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-base font-mono font-medium tracking-tight text-[#0000FF] sm:text-4xl lg:text-xl " id="newsletter-headline">
              Want to Connect?
            </h2>
           
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-2  ">
            <form className="sm:flex" onSubmit={postEmailToDatabase}>
              <label htmlFor="email-address" className="sr-only ">
                Email address
              </label>
              <input
                value = {subscribed? "thank you for subscription!":email}
                onChange={(e) => setEmail(e.target.value)}
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className=" w-60 text-[#FFDDED] bg-[#0000FF] border-transparent placeholder-[#FFDDED] focus:border-white focus:ring-0 focus:ring-white focus:ring-offset-0 focus:ring-offset-gray-800 sm:max-w-xs"
                placeholder="//your email here"
              />
              <div className="w-36  shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0 ">
                <button
                  type="submit"
                  className="flex w-full bg-[#FFDDED] items-center justify-center border-2 border-[#0000FF] px-5 py-3 text-2xl font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                    
                {subscribed? "✅" : "😘 "}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
    )
  }
  