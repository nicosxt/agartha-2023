import Head from 'next/head'
import Link from 'next/link'
import { useAuth,signOut } from '../lib/authContext'
import { useRouter } from 'next/router';

export default function Home(): any {

  const { user} = useAuth();
  const router = useRouter();
  const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

  const enterUnite = async() => {
    await sleep(500);
    router.push('/unite');
  };

  const enterEarth = async() => {
    await sleep(500);
    router.push('/earth');
  };

  const enterPersonal = async() => {
    await sleep(500);
    router.push('/personal');
  };

  const enterPlayful= async() => {
    await sleep(500);
    router.push('/playful');
  };

  const enterTech= async() => {
    await sleep(500);
    router.push('/tech');
  };

  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>
      {/* <div className="bg-[#FFF8F1]"> */}

      <main className=" min-h-screen  bg-white">
              <div className="sm:text-center lg:text-center">
                <div className="px-4  pt-32 ">
                <h1 className="text-4xl pb-4 pt-10 font-mono  font-medium text-[#0000FF] sm:text-5xl md:text-6xl ">
                  <span className="block xl:inline ">Your Gate to </span>
                  <p className="break-all pb-8"/>
                  <span className="block xl:inline">Meaningful Communities</span>

                  
                </h1>
                <div className="flex justify-center gap-x-20 pt-14">
                  <a style={{ cursor: "pointer" }}>
                    <img onMouseEnter={enterUnite}  className="h-16 w-16 hover:scale-125" src='/balls/unite.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onMouseEnter={enterEarth} className="h-16 w-16 hover:scale-125" src='/balls/earth.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onMouseEnter={enterPersonal} className="h-16 w-16 hover:scale-125" src='/balls/personal.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onMouseEnter={enterPlayful} className="h-16 w-16 hover:scale-125" src='/balls/playful.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onMouseEnter={enterTech} className="h-16 w-16 hover:scale-125" src='/balls/technical.png'  />
                  </a>
                </div>
                {/* <div className='flex'> */}
                  {/* <div className='w-1/2'>
                    <h1 className="text-4xl text-right pb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#47FF43] via-[#6184FF] to-[#FF43EC] font-extrabold sm:text-5xl md:text-6xl">
                          <Typewriter
                            options={{
                            strings: ['Solarpunk', 'Regenerative','Communal','Decentralized'],
                            autoStart: true,
                            loop: true,
                            delay: 100
                            }}
                          />
                    </h1>
                </div> */}
                {/* <div className='w-1/2'>
                <h1 className="text-4xl text-[#0000FF] pb-4 font-extrabold text-left sm:text-5xl md:text-6xl">
                  Communities</h1>
                </div> */}

                {/* </div> */}

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