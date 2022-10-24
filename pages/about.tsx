import Head from 'next/head'
import { useState } from 'react';
import Link from 'next/link'
import { useAuth,signOut } from '../lib/authContext'



interface Props {
  posts: any
}

export default function Home(props:Props): any {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);  
  const { user} = useAuth();

  const [isHovering, setIsHovered] = useState(false);

  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>
      {/* <div className="bg-[#FFF8F1]"> */}

      <main className=" min-h-screen  bg-white">
              <div className="sm:text-center lg:text-center">
                <div className="px-4  pt-32 ">
                <h1 className="text-4xl pb-4 pt-10 font-mono  font-medium text-[#0000FF] sm:text-5xl md:text-6xl">
                  <span className="block xl:inline pb-4">About</span>

                  
                </h1>
                
               


                <div className=" pt-6 sm:mt-8 sm:flex justify-center gap-x-14 sm:justify-center lg:justify-center">
                  {!user && (<>
                  <div>
                    <Link href='/map'>
                    <a style={{ cursor: "pointer" }}>

                      <img className="h-14 " src='/buttons/explore.png'/>
                    </a>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href='https://discord.gg/UAjzAx62Ug' target="_blank" rel="noreferrer">
                      <img className="h-14" src='/buttons/join.png'/>
                    </a>
                  </div>
                  </>
                  )}
                </div>
                </div>
              </div>
          </main>
    </>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//       <FrontPage>{page}</FrontPage>
//       // <Layout>{page}</Layout>

//   )
// }