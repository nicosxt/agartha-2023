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

              <nav className="mt-8 mb-8  relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="mb-10flex items-center justify-between w-full md:w-auto">
                    <Link href='/'>
                    <a>
                      <span className="sr-only">Space Exchange</span>
                      <img className="h-14 w-auto sm:h-14" src="https://s2.loli.net/2022/06/12/6sFR1uCzIM4KcHT.png"/>
                    </a>
                    </Link>

                  </div>
                </div>
               
              </nav>
            

    <div className="flex-grow">
        {children}
        
    </div>
    <Footer />
    </div>

    </>

}