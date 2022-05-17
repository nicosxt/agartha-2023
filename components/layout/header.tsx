import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

export default function Header(props : any){
    const { user, username, loading} = useAuth()
    return <>
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-8 md:pb-8 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-8">
          {/* <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg> */}
    
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
                    <div className="-mr-2 flex items-center md:hidden">
                      <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  {/* <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Product</a>
    
                  <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Features</a>
    
                  <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>
    
                  <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Company</a> */}
                  {!user && !loading? 
                    <>
                        {/* <Link href='/signin'>
                            <a className="font-medium text-indigo-600 hover:text-indigo-500">Log In</a>
                        </Link> */}
                        {/* <Link href='/signup'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

                            <a className="font-medium text-gray-500 hover:text-gray-900">Sign up</a>
                            </button>
                        </Link> */}
                    </>
                  :null}   
                  {user?<>
        
                     <Link href={`/${username}`}><button ><a className="font-medium text-gray-500 hover:text-gray-900"> Profile Page</a></button></Link>

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
    
          {/* <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Data to enrich your</span>
                <span className="block text-indigo-600 xl:inline">online business</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Get started </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"> Live demo </a>
                </div>
              </div>
            </div>
          </main> */}
        </div>
      </div>
      {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://s2.loli.net/2022/04/14/PAmBNk9uo6vfTZW.png" alt=""/>
      </div> */}
    </div>
    </>
    

    // return <div className="flex h-full flex-row">

    //     <div className="flex-1 my-auto">
    //     <Link href='/'>
    //         <button ><strong>Space Exchange</strong></button>
    //     </Link>
    //     </div>

    //     <div className="m-auto space-x-2">
            

    //     {!user && !loading? 
        
    //     <>
    //     <Link href='/signin'><Button className="m-auto"> <b>Log In</b></Button></Link>

    //     <Link href='/signup'>
    //         <Button 
    //             fontFamily={'heading'}
    //             bgGradient="linear(to-r, red.400,pink.400)"
    //             color={'white'}
    //             _hover={{
    //             bgGradient: 'linear(to-r, red.400,pink.400)',
    //             boxShadow: 'xl',
    //         }}> 
            
    //     Sign Up</Button></Link>

    //     </>
    //     :null}
    //     {user?<>
        
    //     {/* <Link href='/privatessr'><button > PrivateSSR</button></Link> */}

    //     {/* <Link href='/private'><button > Private</button></Link> */}
    //     {/* `/${post.username}/` */}

    //     <Link href={`/${username}`}><button > Profile Page</button></Link>
        
    //     <Link href={'/admin'}><button > Write Posts</button></Link>


    //     <button onClick={signOut}> Signout</button>
        
    //     </>:null}

    //     </div>
        
    // </div>
}