import CommunityProfilePage from '../../../components/communities/CommunityProfilePage';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPages } from '../../../lib/notion';
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';
import { parseNotionCommunity } from '../../../lib/community';


export async function getServerSideProps(context: GetServerSideProps) {

    console.log('slug', context.query.slug)

    //https://www.notion.so/agarthamap/446c0e9d7937439ca478aa84e1ea9f15
  
    const response = await fetchPages('446c0e9d7937439ca478aa84e1ea9f15');
  
    const communities = response.results.map(parseNotionCommunity);
    const community = communities.find(({ slug }) => slug === context.query.slug)
    if (!community) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        community: community ?? {}
      },
    };
  }


export default function Community(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const community = props.community;
    const [isMobile, setIsMobile] = useState(false)
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
            <div className="min-h-screen bg-white ">
            <div className=" pt-10 pl-10 pr-10 pb-10 md:pt-20 lg:pt-20 lg:pl-32 lg:pr-32">
                {isMobile ? (
                    <>
                    <div className='w-full'>
                
                        <img className="w-5/6 absolute justify-center" src='/community/card-mobile.png' alt="banner" />
                        <Link href="/map">
                        <img className='  z-30  cursor-pointer h-10 w-10 absolute  
                        rounded-full right-10 top-36
                        transform -translate-x-1/4 translate-y-1/4' src='/community/cross.png'  />
                    </Link>
                   </div>
                    </>

                ) : (
                    <>
                    
                    <img className="w-full sm:w-5/6 lg:w-5/6 md:w-5/6 absolute justify-center" src='/community/card.png' alt="banner" />
                    <Link href="/map">
                    <img className='w-full h-full md:w-7 md:h-7 z-30 cursor-pointer h-10 w-10 absolute 
                    rounded-full  right-1/4 transform sm:w-6 sm:h-6
                    sm:top-48 sm:translate-x-[5.5rem] sm:-translate-y-[4.5rem] 
                    md:top-52 md:-translate-y-[2rem] md:translate-x-[6rem] 
                    lg:top-52 lg:translate-x-[13rem] lg:-translate-y-[1.5rem] 
                    xl:top-52 xl:translate-x-[13.5rem] xl:-translate-y-1/2 
                    2xl:top-52 2xl:right-44 2xl:translate-x-2/4 2xl:-translate-y-1/4 2xl:w-10 2xl:h-10 
                    xl:w-10 xl:h-10 lg:w-10 lg:h-10' src='/community/cross.png'  />
                   </Link>
                   </>

                )}
            {community && <CommunityProfilePage community={community}  />}

            </div>
            </div>
    );
}