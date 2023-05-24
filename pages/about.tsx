import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import ParticlesCustom from '../components/layout/particles'
import { motion } from "framer-motion"
import { Banner, Container, Body } from '../components/styles/styles';
import Subscription from '../components/button/subscription';
export default function Home(): any {
  const router = useRouter();
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const enterUnite = async () => {
    await sleep(500);
    router.push('/unite');
  };

  const enterEarth = async () => {
    await sleep(500);
    router.push('/earth');
  };

  const enterPersonal = async () => {
    await sleep(500);
    router.push('/personal');
  };

  const enterPlayful = async () => {
    await sleep(500);
    router.push('/playful');
  };

  const enterTech = async () => {
    await sleep(500);
    router.push('/tech');
  };

  return <>
    <Head>
      <title>Home</title>

    </Head>

    <Container>
      <ParticlesCustom />

    </Container>
    <Body>
      <main className=" min-h-screen  bg-white">


        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <div className="sm:text-center lg:text-center">
            <div className="px-4   pt-32 ">
              <h1 className="text-2xl text-center pb-4 pt-10 font-mono font-medium text-[#0000FF] sm:text-3xl md:text-4xl lg:text-6xl ">
                <span className="block xl:inline ">Your Gate to </span>
                <p className="break-all pb-8" />
                <span className="block xl:inline">Meaningful Communities</span>
              </h1>
              <div className="flex justify-center pt-4 lg:gap-x-20 md:pt-10 lg:pt-14 sm:gap-x-4">

                <Link href='/unite' style={{ cursor: "pointer" }}>

                  <span className="flex h-16 w-16">

                    <img onClick={enterUnite} className="shrink-0 h-16 w-16  " src='/balls/unite.png' />
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-[#FFDDED] opacity-50" />
                  </span>

                </Link>

                <Link href='/earth' style={{ cursor: "pointer" }}>

                  <span className="flex h-16 w-16">

                    <img onClick={enterEarth} className="shrink-0 h-16 w-16  " src='/balls/earth.png' />
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-[#0000FF] opacity-10" />

                  </span>

                </Link>

                <Link href='/personal' style={{ cursor: "pointer" }}>

                  <span className="flex h-16 w-16">

                    <img onClick={enterPersonal} className="shrink-0 h-16 w-16 " src='/balls/personal.png' />
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-[#FFDDED] opacity-50" />
                  </span>

                </Link>

                <Link href='/playful' style={{ cursor: "pointer" }}>

                  <span className="flex h-16 w-16">

                    <img onClick={enterPlayful} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/playful.png' />
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-[#0000FF] opacity-10" />
                  </span>

                </Link>

                <Link href='/tech' style={{ cursor: "pointer" }}>

                  <span className="flex h-16 w-16">

                    <img onClick={enterTech} className="shrink-0 h-16 w-16 hover:scale-125" src='/balls/technical.png' />
                    <span className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-[#FFDDED] opacity-50" />

                  </span>

                </Link>
              </div>
              <Subscription />


              <div className=" pt-6 flex gap-x-6 sm:mt-8 sm:flex  lg:gap-x-14 justify-center">
                <div>
                  <Link href='/map' style={{ cursor: "pointer" }}>

                    <img className="h-10 sm:h-14 md:h-14 lg:h-14 " src='/buttons/explore.png' />

                  </Link>
                </div>
                <div>
                  <a href='https://discord.gg/UAjzAx62Ug' target="_blank" rel="noreferrer">
                    <img className="h-10 sm:h-14 md:h-14 lg:h-14" src='/buttons/join.png' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </Body>

  </>;
}
