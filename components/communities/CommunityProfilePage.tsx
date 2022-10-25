import Link from 'next/link';
import { useContext, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';


export default function CommunityProfilePage(props : any) {
    const [isMobile, setIsMobile] = useState(false)
    const [isReadMore, setIsReadMore] = useState(false)
    const defaultValues = props.community;
    const { register, handleSubmit, reset, watch, formState, setError } = useForm({ defaultValues, mode: 'onChange' });

    useEffect(() => {
    }, [isReadMore]);

    const handleResize = () => {
        if (window.innerWidth < 768) {
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
   

    return(
        <> 
        <Link href="/map">
         <img className=' z-30 right-12 top-40  cursor-pointer h-10 w-10 absolute  lg:right-28 lg:top-44 rounded-full' src='/community/cross.png'  />
        </Link>
        {isMobile &&
            <>
            <div className='absolute my-4 mx-4'>
            <h1 className='text-5xl font-mono font-bold pr-20 lg:mr-0 line-clamp-2  text-[#0000FF]'>
                {community.communityName}
                </h1>
                
                <img className="mt-4 w-5/6" src='/community/line.png' /> 
                </div>
            </>
        }
        <div className=' mx-4 mt-40 h-72 w-72  md:h-50 md:w-50 sm:ml-4 sm:mt-4 sm:h-52 sm:w-52 lg:h-72 lg:w-72 lg:ml-10 lg:mt-16 absolute border-2 border-[#0000FF] bg-[#0000FF]'>
        <img className=" z-10 absolute w-full h-full object-cover object-center" src={community.avatarUrl? community.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>

            <div className=" h-36 w-36 p-4 ">

            <div className="absolute w-full h-full object-cover object-center bg-[#0000FF] " />
            </div>
            {!isMobile && 
                <div className='flex pt-52 lg:pt-44 md:pt-28 md:gap-x-2 gap-x-8 lg:gap-x-4 '>
                    <a target="_blank" rel="noreferrer" href={community.website}>
                    <img src='/icons/Icon-link.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.twitter}>
                    <img src='/icons/Icon-twitter.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.github}>
                    <img src='/icons/Icon-github.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.instagram}>
                    <img src='/icons/Icon-ig.png'/>
                    </a>
                </div>
            }

        </div>

        <div className='absolute mt-8 mx-4 lg:ml-96 lg:mt-16 lg:mb-10'>
            {!isMobile && <>
            <h1 className='text-5xl lg:ml-4 pb-2 md:text-4xl md:ml-72 font-mono font-bold pr-20 lg:mr-0  text-[#0000FF]  line-clamp-2'>
            {community.communityName}
            </h1>
            
            <img className="mt-4 md:mt-2 w-5/6 lg:ml-4 md:ml-72 md:w-1/2" src='/community/line.png' /> 
            </>}
            
            <div className='pt-40 md:pt-0 lg:pt-0'>
            {isMobile &&
                <div className='flex pt-72 gap-x-6 lg:gap-x-3 '>
                    <a target="_blank" rel="noreferrer" href={community.website}>
                    <img src='/icons/Icon-link.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.twitter}>
                    <img src='/icons/Icon-twitter.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.github}>
                    <img src='/icons/Icon-github.png'/>
                    </a>
                    <a target="_blank" rel="noreferrer" href={community.instagram}>
                    <img src='/icons/Icon-ig.png'/>
                    </a>
                </div>
            }
            {community.tags && 
            <div className='flex flex-wrap mt-8 mx-8 lg:mt-1 lg:ml-4 md:ml-72 md:mt-2 '>
                {community.tags.map((tag:any) => (
                    <span className=' mt-2 text-[#FFDDED] bg-[#0000FF] rounded-3xl py-1 px-4  font-mono font-medium lg:text-xl mr-2' key={tag}>#{tag}</span>
                ))}
            </div>
        }
            </div>
            <div className='flex pt-4'>
                <img className="mt-0 w-4 h-6 lg:ml-4 md:ml-72" src='/community/pin.png' />
                <p className='mx-4 mt-0 text-[#0000FF] font-mono font-thin '>{community.city}, {community.state}, {community.country}</p>
            </div>

            <div className=' w-72 lg:ml-4 md:ml-72 flex flex-wrap mx-2 my-4 md:h-50 md:w-96 sm:ml-4 sm:mt-4 sm:h-52 sm:w-52 lg:h-7/8 lg:w-10/12 absolute bg-[#0000FF]'>
                {isReadMore? 
                    <>
                        <p className='my-4 mx-8 text-white font-mono '>
                        {community.intro}
                        </p>
                        <button onClick={()=> setIsReadMore(!isReadMore) }>
                        <p className='mb-2 mx-8 text-white font-mono'> 
                            Read Less...
                        </p>
                        </button>
                    </>
                    : 
                    <>
                        <p className='my-4 mx-8 text-white font-mono line-clamp-6 md:line-clamp-4 lg:line-clamp-2 '>
                            {community.intro}

                        </p>
                        <button onClick={()=> setIsReadMore(!isReadMore) }>
                        <p className='mb-2 mx-8 text-white font-mono'> 
                            Read More...
                        </p>
                        </button>
                    </>
                }
    
           
            </div>


        </div>
        
        </>
    );

}