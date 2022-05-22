/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
    ],
  }
  ```
*/
import Link from 'next/link';
import { useAuth } from '../lib/authContext'


export default function GetStarted() {
  const { username} = useAuth();
  

    return (
      <div className="py-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-max lg:max-w-7xl mx-auto">
          <div className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <h2 className="leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Space Exchange</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Get Started
              </p>
            </div>
          </div>
          <div className="relative">
            <svg
              className="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)" />
            </svg>
            <svg
              className="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={384} fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)" />
            </svg>
            <div className="relative md:bg-white md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-indigo prose-lg text-gray-500 lg:max-w-none">
                  <p>
                    There are two components for this webapp.
                    <b><a className="text-bold underline decoration-sky-500"> User </a></b>
                     and <b><a className="text-bold underline decoration-pink-500">Community</a></b>
                  </p>
                  <p>
                    As a user, you could 
                    <b><a className="underline decoration-indigo-500"> create new exchange post </a></b>
                    on the header and post information of your room for other people to view.
                  </p>
<br></br>
                  <p>
                    However, merely posting your post is not enough. For other people to view your post, you need to belong to at least one community.
                    If you click the <b><a className="text-bold underline decoration-pink-500">Community</a></b> tab on the header,
                    under the <b><a className="text-bold underline decoration-pink-500">Manage Communities</a></b> section, you will see a button saying 
                    <b><a className="underline decoration-indigo-500"> create a new community. </a></b>

                    You can create a new community by clicking the button and fill in the form. After you create the community, you can click on <b><a className="text-bold underline decoration-sky-500">Members tab </a></b>
                    under the community profile and add members to the community.
                    
                    Additionally, you can also<b><a className="underline decoration-indigo-500"> join an existing community</a></b> by 
                    <b><a className="text-bold underline decoration-sky-500"> giving your username </a></b>
                    to one of the community admin and ask them to add you to the community.
                  
                  </p>
                  <br></br>

                  <p>
                    In fact, this is webapp is designed for <b><a className="text-bold underline decoration-pink-500">established IRL (In Real Life) communities</a></b> (e.g. DAOs, Co-living Spaces, people who formed a community by living together in a desert place for 3 months etc.)
                  </p>
                  <br
                  ></br>
                  <p>
                    Since the people within the community sometimes want to travel to other places ranging from few days to couple months,
                    it creates two needs: <b><a className="text-bold underline decoration-sky-500">1) a vacant place needing to be rented out</a></b>, and 
                    <b><a className="text-bold underline decoration-sky-500"> 2) a place for the person to stay at the travel destination.  </a></b> Both needs can be resolved 
                    quickly by sharing your space information within your community. 
                  </p>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg text-gray-500 lg:mt-0">
              
                  <p>
                    Different from Airbnb or Couchsurfing where they try to connect strangers, this webapp is designed for <b><a className="text-bold underline decoration-pink-500">&quot;Acquaintance Community&quot;. </a></b>
                    For example, people who participated in a co-living space (whether that person is actually living there or participated in an event host by the space) are acquaintances to each other within the community. 
                    At most, the degree of connection would not exceeded by 2.
                    
                  </p>
                  <br></br>

                  <p>
                    Exchange your place with other people in your community can have a lot of perks.
                    The obvious thing is that since it&apos;s a acquaintance community, it eliminates the need to background check the person renting your room. 
                    The cost for renting or sharing a place is also greatly reduced. For big cities like NYC, you&apos;re more likely to get the place with lower-than market rate (including Aribnb). 
                    After all, you&apos;re doing your a favor to your friend, or your friend&apos;s friend. 
                    What&apos;s more valueable here is the network. If it&apos;s a co-living community, you&apos;re also more likely to get more local interaction and feel much better to hang out with actual people than just being a tourist. 
                    
                    </p>
                  <br></br>

                  <p>
                    If you find the place you want to rent within the community through the members&apos; post. You are<b><a className="text-bold underline decoration-pink-500"> encouraged to contact the person directly </a></b>by clicking on their profile page. There should be a list of social media contact methods that person has.
                    If you&apos;re already a friend, great, just send the person a message. If you&apos;re not a friend yet but you belong to the same community, just send a friend invitation, and let the conversation begin.
                    Since this webapp is still at its early stage, there are other more convenient features yet to be built. 
                    For any questions, please contact me at: lucy1049684100@gmail.com 
                  </p>
                </div>
              </div>
              <div className="mt-8 inline-flex rounded-md shadow">
              {/* <Link href={`/${username}`}>

                <a
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Bring me to my profile
                </a>
                </Link> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  