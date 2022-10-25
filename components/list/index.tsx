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
      <div className="bg-white ">
        <div className=" py-16 px-4 sm:py-24 sm:px-6 lg:max-w-full lg:px-0">


          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2  md:grid-col-3 lg:mr-32 lg:grid-cols-3 xl:grid-cols-4">

            {communities && communities.map((community:any) => (
              <div key={community.slug} className=" ">
                <div className="mx-10 border-2  border-[#0000FF] bg-[#EAFFF4] lg:h-full pb-4 lg:w-72 w-72 h-96   bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 bg-[#DDFFF3]">
                    <div className="h-60 w-60  mt-6 mx-5 lg:mx-5 mb-2 border-2 border-[#0000FF] ">
                  <img
                    src={community.avatarUrl}
                    className="h-full w-full  object-cover object-center lg:h-full lg:w-full"
                  />
                  </div>
                  <div>
                    <h3 className="text-md mt-4 font-bold font-inter text-[#0000FF] text-center">
                      <a href={`/community/${community.slug}`}>
                        <span aria-hidden="true" className="" />
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
  