import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { Children, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import usePortal from 'react-cool-portal';
import Dashboard from '../users/Dashboard'
import { useEffect, useState} from 'react'
import { getUserWithUsername } from '../../lib/firebaseConfig/init'
import Footer from '../layout/footer'
type Props = {
  children: React.ReactNode;
};
export default function FrontPage({children} : Props){
   
    return <>
 <div className="flex flex-col min-h-screen container mx-auto md:w-11/12  lg:w-4/5
    divide-y divide-black-500">
       <div className=" h-16 ">
    <div className="relative bg-white ">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-2 bg-white sm:pb-8 md:pb-2 lg:max-w-2xl lg:w-full lg:pb-2 xl:pb-2">

          <div>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link href='/'>
                    <a>
                      <span className="sr-only">Workflow</span>
                      <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"/>
                    </a>
                    </Link>

                  </div>
                </div>
               
              </nav>
            </div>
            
          </div>
    
        </div>

      </div>
    </div>

    
    </div>
    <div className="flex-grow">
        {children}
        
    </div>
    <Footer />
    </div>

    </>

}