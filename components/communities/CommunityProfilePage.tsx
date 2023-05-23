import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

/*
    todo: remove tailwind
    todo: make tags links to community list filter page
    todo: make this an overlay on the map
*/

export default function CommunityProfilePage(props: any) {
    const [isMobile, setIsMobile] = useState(false)
    const [isReadMore, setIsReadMore] = useState(false)
    const defaultValues = props.community;

    useEffect(() => {
    }, [isReadMore]);

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
    const community = props.community;
    const [admin, setAdmin] = useState<boolean>(false);
    console.log("community is", community);


    return (
        <>
            <div className='flex'>
                <div className=' mx-4 mt-40 h-72 w-72  md:h-50 md:w-50 sm:ml-4 
        sm:mt-4 sm:h-44 sm:w-44 
        lg:h-64 lg:w-64 lg:ml-10 lg:mt-10 
        xl:4/12 xl:4/12 absolute border-2 border-[#0000FF] bg-[#0000FF]'>
                    <img className=" z-10 absolute w-full h-full object-cover object-center" src={community.image ? community.image : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg"} alt="" />

                    <div className=" h-36 w-36 p-4 ">

                        <div className="absolute w-full h-full object-cover object-center bg-[#0000FF] " />
                    </div>
                    <div className='flex pt-52 sm:pt-14 lg:pt-36 md:pt-20 md:gap-x-2 gap-x-8 lg:gap-x-4 sm:gap-x-2 '>
                        {community.url &&
                            <a target="_blank" rel="noreferrer" href={community.url}>
                                <img src='/icons/Icon-link.png' />
                            </a>
                        }
                    </div>

                </div>

                <div className='absolute mt-8 mx-4 sm:ml-1 sm:mt-4 md:ml-2 lg:ml-80 lg:mt-10 lg:mb-10 xl:w-7/12 2xl:w-6/12'>

                    <h1 className='text-5xl sm:ml-60 sm:text-sm lg:ml-4 pb-2 md:text-xl md:ml-60 font-mono font-bold pr-20 lg:mr-0  md:text-3xl lg:text-3xl  xl:text-4xl 2xl:text-5xl text-[#0000FF]  line-clamp-2'>
                        {community.title}
                    </h1>

                    <img className="mt-4 sm:mt-1 md:mt-2 w-5/6 lg:ml-4 sm:ml-60 sm:w-1/2 md:ml-60 md:w-1/2" src='/community/line.png' />
                    {community.tags &&
                        <div className='flex flex-wrap mt-8 mx-8 lg:mt-1 lg:ml-4 md:ml-60 sm:ml-60 md:mt-2 sm:mt-0 '>
                            {community.tags.map((tag: any) => (
                                <span className=' mt-2 text-[#FFDDED] bg-[#0000FF] rounded-3xl py-1 px-4 font-mono font-medium 2xl:text-2xl lg:text-lg sm:text-xs xl:text-lg mr-2' key={tag}>#{tag}</span>
                            ))}
                        </div>
                    }

                    <div className='flex pt-4'>
                        <img className="mt-0 w-4 h-6 lg:ml-4 md:ml-60 sm:ml-60 sm:w-2 sm:h-3 lg:h-6 lg:w-4" src='/community/pin.png' />
                        <p className='mx-4 mt-0 text-[#0000FF] font-mono font-thin sm:text-xs lg:text-lg '>{community.country}</p>
                    </div>

                    <div className=' mt-4 w-72 h-fit lg:ml-4 md:ml-60  mx-2  md:w-96 sm:ml-60 sm:mt-4  sm:w-64  md:w-6/12 lg:w-10/12 2xl:w-full absolute bg-[#0000FF]'>
                        <p className='my-4 mx-8 text-sm text-white font-mono sm:text-xs md:text-md lg:text-lg xl:text-lg 2xl:text-lg'>
                            <ReactMarkdown>{community.description}</ReactMarkdown>
                        </p>


                    </div>


                </div>
            </div>
        </>
    );

}