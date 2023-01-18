import Link from 'next/link'
import Footer from '../layout/footer'

type Props = {
  children: React.ReactNode;
};
export default function FrontPage({ children }: Props) {

  return <>
    <div className="relative flex flex-col min-h-screen  bg-white">

      <nav className="mt-4 mb-4 ml-4 relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href='/'>
              <a>
                <span className="sr-only">zkVote</span>
                <img className="h-14 w-auto sm:h-14 ml-10" src="/icons/zkvote.png" />
              </a>
            </Link>

          </div>
        </div>

        <div className="mr-4 items-center flex justify-end sm:flex md:flex md:flex-1 lg:w-0 mr-10">

          <a target="_blank" rel="noreferrer" href='https://docs-p0xeidon-xyz.vercel.app/p0x-lab/1.0.0/application-contracts/zk-vote/zk-vote.html'>
            <p className='font-mono text-black  pr-8'>Doc</p>
          </a>
          <div className="rounded-md shadow">
            <a target="_blank" rel="noreferrer"  href="https://zk-vote-web-two.vercel.app/" className="w-full flex items-center justify-center py-1 px-4  border border-transparent text-base font-medium rounded-md text-white bg-black md:text-lg "> Launch App</a>
          </div>




        </div>
      </nav>



      <div >
        {children}

      </div>
    </div>

  </>

}