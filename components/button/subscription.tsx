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
        <div className="flex flex-col items-center justify-center mt-6 py-2 ">
      <div className="w-5/6 bg-white border-[#0000FF] border-2 lg:w-1/2 md:w-1/2 sm:w-1/2">
        <div className=" px-2 sm:px-2 lg:flex lg:items-center lg:py-0  lg:px-2">
          <div className="mx-2 sm:py-2  lg:mt-0 lg:w-0 lg:flex-1">
            <h2 className="pt-2 lg:pt-0 text-sm text-center font-mono font-medium tracking-tight text-[#0000FF] sm:text-base lg:text-xl " id="newsletter-headline">
              Want to Connect?
            </h2>
           
          </div>
          <div className="mt-2 mx-4 md:mx-2 md:mt-0 sm:my-2 sm:mt-0 lg:mt-2 lg:ml-2  ">
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
                className="md:my-4 text-sm sm:w-24 md:w-full lg:text-base w-full lg:w-60  lg:py-0  text-[#FFDDED] bg-[#0000FF]  placeholder-[#FFDDED] "
                placeholder="//your email here"
              />
              <div className="w-50 md:w-36 lg:w-36  sm:mt-0 sm:ml-3 pb-2 lg:pb-0">
                <button
                  type="submit"
                  className="  my-2 w-full md:my-4 lg:my-0 md:w-full  bg-[#FFDDED] py-1 lg:py-0 lg:my-4 items-center justify-center border-2 border-[#0000FF] px-5  text-2xl font-medium  hover:bg-indigo-600  "
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
  