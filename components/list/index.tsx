import { collectionGroup,collection, query, where, getDocs, orderBy, limit, startAfter, getDoc} from "firebase/firestore";  
import Fuse from 'fuse.js';
import { firestore } from '../../lib/firebaseConfig/init'
import { getUserWithUsername, communityToJSON } from '../../lib/firebaseConfig/init';
import { useEffect, useState } from "react";

  export default function CommunityList() {
    const [communityQuery, setCommunityQuery] = useState('');
    const [communities, setcommunities] = useState<any>();
    const tags = ["Regen","Techy","Artsy","Coliving","Solarpunk","Family"];
    useEffect(() => {
      const getCommunities = async () => {
      const communitiesQuery = query(
        collection(firestore, 'communities'),
        )
      setcommunities((await getDocs(communitiesQuery)).docs.map(communityToJSON));
      }
      getCommunities();
    
    }, [])

    const fuse = new Fuse(communities, {
      keys: ['communityName', 'intro', 'tags', 'city', 'state', 'country'],
      // threshold: 0.3,
    });
    let searchResults;
    if(communities){

      const results = fuse.search(communityQuery);
      
      console.log("results", results);
      searchResults = communityQuery? results.map(({ item }) => item) : communities;
    }

    function handleOnSearch({ currentTarget ={} }:any) {
      const { value } = currentTarget;
      setCommunityQuery(value);
    }

    function changeQuery(tag:string){
      setCommunityQuery(tag);
    }
    return (
      
      <div className="bg-white ">

        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 md:px-8 lg:max-w-7xl lg:px-8">
          <form>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-[#0000FF] dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" value={communityQuery} onChange={handleOnSearch} id="default-search" className="block p-4 pl-10 w-full text-lg text-gray-900 bg-[#FFDDED] border border-2 border-[#0000FF] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-[#0000FF] placeholder:italic dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Keywords..." required />
            </div>
        </form>
        <div className='flex flex-wrap mt-8 mx-8 lg:mt-1 lg:ml-4 md:ml-72 md:mt-2 '>
                {tags.map((tag:any) => (
                    <button className='mt-2 hover:scale-125 text-[#FFDDED] bg-[#0000FF] rounded-3xl py-1 px-4 font-mono font-medium lg:text-xl mr-2' onClick={()=>changeQuery(tag)} key={tag}>#{tag}</button>
                ))}
            </div>
        </div>
        <div className=" py-16 px-4 sm:py-24 sm:px-6 lg:max-w-full lg:px-0">



          <div className="mt-0 grid grid-cols-1 gap-8 sm:grid-cols-2  md:grid-col-3 lg:mr-32 lg:grid-cols-3 xl:grid-cols-4">

            {searchResults && searchResults.map((community:any) => (
              <a href={`/community/${community.slug}`}>

              <div key={community.slug} className=" ">
                <div className="mx-10 border-2  border-[#0000FF] bg-[#EAFFF4]  pb-4  lg:w-72 lg:h-96 w-72 h-96 bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 bg-[#DDFFF3]">
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
                </a>
            ))}

          </div>
        </div>
      </div>
    )
  }
  