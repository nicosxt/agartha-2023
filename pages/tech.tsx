
import Head from 'next/head'
import { useState } from 'react';
import Link from 'next/link'
import { useAuth } from '../lib/authContext'
import { useRouter } from 'next/router';
import ParticlesCustom from '../components/layout/particles'
import { motion } from "framer-motion"


export default function Home(): any {
  const { user} = useAuth();
  const router = useRouter();
  const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

  const enterUnite = async() => {
    router.push('/unite');
  };

  const enterEarth = async() => {
    router.push('/earth');
  };

  const enterPersonal = async() => {
    router.push('/personal');
  };

  const enterPlayful= async() => {
    router.push('/playful');
  };

  const enterTech= async() => {
    router.push('/tech');
  };
  return (
    <>
      <Head>
        <title>Home</title>
        
      </Head>
      <ParticlesCustom />

      <main className=" min-h-screen mx-auto bg-white">

              <div className="sm:text-center lg:text-center">
                <div className="px-4  pt-32 ">
                <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
                    <div className="px-4 lg:pl-48 items-left lg:pr-24">
                        <h1 className="lg:text-5xl lg:pb-4 lg:pt-4 font-mono tracking-wider text-2xl font-bold text-[#0000FF]  text-left">
                        <span className="block xl:inline pb-4">Tech-centric</span>
                        </h1>
                        <div className='text-left font-mono text-[#0000FF] leading-loose pr-10'>
                        <p >{"We believe adapting to the lattest technology makes us resilient. Technology is here to serve mankinds’ overall wellbeing, not the other way around."}
                        </p>
                        <p>Automation empowers us and simplification liberates us.
                        </p>
                        <p>
                        We are solution driven, tech-centric, building a society of innovators and creating softwares as a service.                         </p>
                </div>
                </div>
                </motion.div>
                <div className="flex justify-center pt-4 lg:gap-x-20 md:pt-10 lg:pt-14 sm:gap-x-4">
                  <a style={{ cursor: "pointer" }}>
                    <img onClick={enterUnite}  className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/unite.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onClick={enterEarth} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/earth.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onClick={enterPersonal} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/personal.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onClick={enterPlayful} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/playful.png'  />
                  </a>
                  <a style={{ cursor: "pointer" }}>
                  <img onClick={enterTech} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/technical.png'  />
                  </a>
                </div>

                <div className=" pt-6 flex gap-x-6 sm:mt-8 sm:flex  justify-center lg:gap-x-14 justify-center">
                  {!user && (<>
                  <div>
                    <Link href='/map'>
                    <a style={{ cursor: "pointer" }}>

                      <img className="h-10 sm:h-14 md:h-14 lg:h-14 " src='/buttons/explore.png'/>
                    </a>
                    </Link>
                  </div>
                  <div>
                    <a href='https://discord.gg/UAjzAx62Ug' target="_blank" rel="noreferrer">
                      <img className="h-10 sm:h-14 md:h-14 lg:h-14" src='/buttons/join.png'/>
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

