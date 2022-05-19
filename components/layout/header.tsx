import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import usePortal from 'react-cool-portal';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
export default function Header(props : any){
    const { user, username, loading} = useAuth()
    return <>
    <div className="relative bg-white ">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-2 bg-white sm:pb-8 md:pb-8 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-8">

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
                <div className=" block ml-2 pr-2 space-x-2 md:block md:ml-10 md:pr-4 md:space-x-8 ">
          
 
                  {user?<>
        
                     <Link href={`/${username}`}><button ><a className="font-medium text-gray-500 hover:text-gray-900"> Profile</a></button></Link>

                     <Link href={'/community'}><button><a className="font-medium text-gray-500 hover:text-gray-900">Community</a></button></Link>

            
                     <Link href={'/admin'}><button><a className="mt-8 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Post an Exchange</a></button></Link>
    
                     <Link href={'/'}>
                     <button onClick={signOut}> <a className="mt-8 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signout</a></button>
                     </Link>
                     </>:null}
    
                </div>
              </nav>
            </div>
            
          </div>
    
        </div>
      </div>

    </div>
    </>

}