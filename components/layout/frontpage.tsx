import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import Footer from '../layout/footer'
type Props = {
  children: React.ReactNode;
};
export default function FrontPage({children} : Props){
   
    return <>
 <div className="flex flex-col min-h-screen  bg-[#FFDDED] 
    divide-y-2 divide-[#0000FF]">

              <nav className="mt-4 mb-4 ml-4 relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href='/'>
                    <a>
                      <span className="sr-only">Agartha</span>
                      <img className="h-14 w-auto sm:h-14" src="https://s2.loli.net/2022/10/24/U2uwF43q5IeXtYL.png"/>
                    </a>
                    </Link>

                  </div>
                </div>

                <div className="mr-4 items-center justify-end md:flex md:flex-1 lg:w-0">
                  <Link href={'/about'}>
                    <a style={{ cursor: "pointer" }}>
                   <p className='font-mono text-[#0000FF]  pr-4'>About</p>
                   </a>
                   </Link>

          </div>
              </nav>

            

    <div >
        {children}
        
    </div>
    </div>

    </>

}