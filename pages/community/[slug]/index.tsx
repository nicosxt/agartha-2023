import { getCommunityWithSlug, communityToJSON, memberToJSON, postToJSON } from '../../../lib/firebaseConfig/init';
import {firestore} from '../../../lib/firebaseConfig/init';
import CommunityProfilePage from '../../../components/communities/CommunityProfilePage';
import { useEffect, useState } from 'react';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import Link from 'next/link';
export async function getServerSideProps(context:any){
    const {query:qr} = context;
    const {slug} = qr;
    return {
        props: {slug}
    }
}



export default function Community(props:any) {
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



    const [community, setCommunity] = useState<any>(null);
    const realSlug = props.slug;
    console.log(realSlug)

    useEffect(() => {
        const getCommunityData = async () => {
            const communityRef = doc(firestore, 'communities', realSlug);
            const communityDoc = await getDoc(communityRef);
            const communityData = communityDoc.data();
            console.log("communityData is", communityData);
            setCommunity(communityData);
        }
        getCommunityData();
    }, []);

    return (
        <main className='overflow-x-hidden'>
            <div className="min-h-screen bg-white overflow-x-hidden">
            <div className=" grid grid-flow-row-dense grid-cols-3 grid-rows-3 pt-10 pl-10 pr-10 pb-10 md:pt-20 lg:pt-20 lg:pl-32 lg:pr-32">
                {isMobile ? (
                    <>
                
                    <img className="w-5/6 absolute justify-center" src='/community/card-mobile.png' alt="banner" />
                    <Link href="/map">
                    <img className=' z-30 right-12 top-40  translate-x-[7.5rem] -translate-y-[0rem] cursor-pointer h-10 w-10 absolute  lg:right-28 lg:top-44 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2/4' src='/community/cross.png'  />
                   </Link>
                    </>

                ) : (
                    <>
                    
                    <img className="w-5/6 lg:w-5/6 md:w-5/6 absolute justify-center" src='/community/card.png' alt="banner" />
                    <Link href="/map">
                    <img className='w-full h-full md:w-7 md:h-7 z-30 cursor-pointer h-10 w-10 absolute 
                    rounded-full top-1/4 right-1/4 transform sm:w-7 sm:h-7
                    sm:translate-x-[5.5rem] sm:-translate-y-[4.5rem] md:translate-x-[6rem] 
                    md:-translate-y-[2rem] lg:translate-x-[13rem] lg:-translate-y-[1.5rem] 
                    xl:translate-x-[13.5rem] xl:-translate-y-[1rem] 2xl:translate-x-[15rem] 
                    2xl:-translate-y-[1rem] 2xl:w-10 2xl:h-10 xl:w-10 xl:h-10 lg:w-10 lg:h-10' src='/community/cross.png'  />
                   </Link>
                   </>

                )}
            {community && <CommunityProfilePage community={community}  />}

            </div>
            </div>
            {/* {community && <CommunityProfilePage community={community} />} */}
        </main>
    );
}