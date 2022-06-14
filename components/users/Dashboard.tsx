import Link from 'next/link';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth,signOut } from '../../lib/authContext'
import { Disclosure } from '@headlessui/react'

import {
  LightBulbIcon,
  HomeIcon,
  UserIcon,  
  MenuIcon,
  XIcon,
  AcademicCapIcon,
  SwitchHorizontalIcon,
  UserGroupIcon
} from '@heroicons/react/outline'


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
    user: any
    username: any
    children: any
    
}
export default function Dashboard(props: Props): any {
    const { user, username} = props;
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [navigation, setNavigation] = useState([
        { name: 'Profile', href:  `/${username}`, icon: UserIcon, current: false },
        // { name: 'Exchange', href:  `/${username}/exchange`, icon: InboxIcon, current: false },
        // { name: 'Exchange', href:  `/${username}/community/manage`, icon: UsersIcon, current: false },
        // { name: 'Community', href: '/community', icon: FolderIcon, current: false },
        // { name: 'Calendar', href: '/', icon: CalendarIcon, current: false },
        // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
        // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
        {
          name: 'Exchange',
          icon: SwitchHorizontalIcon,
          current: false,
          children: [
            { name: 'Manage Your Exchange', href: `/${username}/exchange` },// manage communities in the same page?        
            { name: 'Exchange Feed', href: `/${username}/feed`},
          ],
        },
        {
            name: 'Community',
            icon: UserGroupIcon,
            current: false,
            children: [
              { name: 'My Communities', href: `/${username}/community` },// manage communities in the same page?        
              { name: 'Manage Communities', href: `/${username}/community/manage`},
              { name: 'Explore Communities', href: `/${username}/community/explore` },
            //   { name: 'Settings', href: '#' },
            ],
          },
          { name: 'Wiki', href:"https://yingru-qiu.gitbook.io/space-exchange/", icon: AcademicCapIcon, current: false },
          // { name: 'Plugin', href:"https://yingru-qiu.gitbook.io/space-exchange/", icon: LightBulbIcon, current: false },


    ])
      
//  <Link href={'/'}>
{/* <button onClick={signOut}> <a className="mt-8 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signout</a></button>
</Link> */}
    return (
        <> <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                    <img className="h-16 w-16 rounded-full btn" src={user.avatarUrl? user.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
                    <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.username}</p>
                          <Link href={`/${username}/edit`}>
                            <a>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Edit</p>
                          </a>
                          </Link>
                        </div>
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map((item, id) => !item.children ? (
                        <Link href={item.href} key={item.name}>

                        <a
                        onClick={() => setNavigation(navigation.map((item, index) => {
                            if (index === id) {
                                return { ...item, current: true };
                            }
                            return { ...item, current: false };
                            }))
                            }
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                             onClick={() => setNavigation(navigation.map((item, index) => {
                                if (index === id) {
                                    return { ...item, current: true };
                                }
                                return { ...item, current: false };
                                }))
                                }
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                        </Link>
                      ) : (
                        <Disclosure as="div" key={item.name} className="space-y-1">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                              )}
                            >
                              <item.icon
                                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.name}</span>
                              <svg
                                className={classNames(
                                  open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                  'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                <Link key={subItem.name} href={subItem.href} passHref={true}>
                                <Disclosure.Button
                                
                                  className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                                </Link>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <Link href={'/'}>
<button onClick={signOut}> <a className="mt-8 inline-flex items-left px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signout</a></button>
</Link>
                    {/* <a href="#" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </a> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>



        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                 <img className="h-16 w-16 rounded-full btn" src={user.avatarUrl? user.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
            <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.username}</p>
                          <Link href={`/${username}/edit`}>
                            <a>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Edit</p>
                          </a>
                          </Link>
                        </div>
                    
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigation.map((item, id) => !item.children ? (
                    <Link href={item.href} key={item.name}>
                  <a
                    onClick={() => setNavigation(navigation.map((item, index) => {
                        if (index === id) {
                            return { ...item, current: true };
                        }
                        return { ...item, current: false };
                        }))
                        }
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                   
                    )}

                  >
                    <item.icon
                        onClick={() => setNavigation(navigation.map((item, index) => {
                        if (index === id) {
                          return { ...item, current: true };
                        }
                        return { ...item, current: false };
                      }))
                      }
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                  
                    />
                    {item.name}
                  </a>
                    </Link>
                )
                : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                          )}
                        >
                          <item.icon
                            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                          <svg
                            className={classNames(
                              open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                              'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href} passHref={true}>
                            <Disclosure.Button
                            
                              className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                            >
                              {subItem.name}
                            </Disclosure.Button>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))
                    }
              </nav>
              <Link href={'/'}>
<button onClick={signOut}> <a className="mt-8 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signout</a></button>
</Link>
            </div>

          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* <h1 className="text-2xl font-semibold text-gray-900"></h1>
                <div className="mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/> */}

              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {props.children}
              
              </div>
            </div>
          </main>
        </div>
      </div>
           </>
    )
}