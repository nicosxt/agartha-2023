import { collectionGroup,collection, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  

import { firestore } from '../../lib/firebaseConfig/init'
import { getUserWithUsername, communityToJSON } from '../../lib/firebaseConfig/init';
import { useEffect, useState } from "react";

  export default function CommunityList() {

    // const [communities, setcommunities] = useState(props.communities);

    // console.log("communities", communities);
    const [communities, setcommunities] = useState<any>();
    useEffect(() => {
      const getCommunities = async () => {
      const communitiesQuery = query(
        collection(firestore, 'communities'),
        )
      setcommunities((await getDocs(communitiesQuery)).docs.map(communityToJSON));
      console.log("communities", communities);
      // setcommunities(communities);
      }
      getCommunities();
    
    }, [])


    return (
      <div className="min-h-screen bg-white ">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-full lg:px-0">
          <h1 className="text-4xl text-center pb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#47FF43] via-[#6184FF] to-[#FF43EC] font-extrabold sm:text-4xl md:text-4xl">
            Explore Meaningful Communities
            </h1>

          <div className="-mx-px mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 mx-4 lg:mr-32 lg:grid-cols-4 ">

            {communities && communities.map((community:any) => (
              <div key={community.slug} className="group relative">
                <div className="border-2 border-[#0000FF] bg-[#EAFFF4] lg:h-96 lg:w-72 w-72 h-96  mx-20 bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 bg-[#DDFFF3]">
                    <div className="h-60 w-60  mt-6 mx-5 lg:mx-5 mb-2 border-2 border-[#0000FF] ">
                  <img
                    src={community.avatarUrl}
                    className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
                  />
                  </div>
                  <div>
                    <h3 className="text-md mt-4 font-bold font-inter text-[#0000FF] text-center">
                      <a href={`/community/${community.slug}`}>
                        <span aria-hidden="true" className="absolute  inset-0" />
                        {community.communityName}
                      </a>
                    </h3>
                    <p className=" text-sm pt-2 font-inter text-[#0000FF] text-center">{community.city}, {community.state}, {community.country}</p>
                  </div>
                </div>
  
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  