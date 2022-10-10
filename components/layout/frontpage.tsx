import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import Footer from '../layout/footer'
type Props = {
  children: React.ReactNode;
};
export default function FrontPage({children} : Props){
   
    return <>
 <div className="flex flex-col min-h-screen  bg-[#FFF8F1] 
    divide-y-4 divide-[#0000FF]">

              <nav className="mt-4 mb-4 ml-4 relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href='/'>
                    <a>
                      <span className="sr-only">Agartha</span>
                      <img className="h-14 w-auto sm:h-14" src="https://s2.loli.net/2022/10/11/lGUY8a3xMwtIZuB.png"/>
                    </a>
                    </Link>

                  </div>
                </div>

                <div className="mr-4 items-center justify-end md:flex md:flex-1 lg:w-0">
            <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            <img className="h-10 w-auto sm:h-10" src="https://s2.loli.net/2022/10/11/F1mpqc3jRdNbsxV.png"/>
            </a>
       
          </div>
              </nav>

            

    <div >
        {children}
        
    </div>
    </div>

    </>

}