import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { motion } from "framer-motion"
export default function Home(): any {
  return (
    <>
      <Head>
        <title>Home</title>

      </Head>
      <main className=" min-h-screen bg-gradient-to-r from-[#F5F3F6] to-[#F1E1EC]">


        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <div className="sm:text-left lg:text-left">
            <div className="px-4   pt-32 ">

              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className='flex'> 
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <div className='flex'>
                        <span className="block xl:inline">Vote&nbsp; </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-br from-[#F2E1ED] to-[#5FFF37]  xl:inline"> Anonymously &</span>
                      </div>
                      <span className="block text-[#5FFF37] xl:inline"> Confidently</span>
                    </h1>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a target="_blank" rel="noreferrer" href="https://zk-vote-web-two.vercel.app/" className="w-full flex items-center justify-center py-2 px-8 border border-transparent text-base font-medium rounded-md text-white bg-black md:text-lg md:px-10"> Launch App</a>
                      </div>

                    </div>
                  </div>
                  <img className="ml-48 w-60 h-60" src="/icons/vote.png" />

                </div>
              </main>
            </div>
          </div>
        </motion.div>

      </main>

    </>
  )
}
