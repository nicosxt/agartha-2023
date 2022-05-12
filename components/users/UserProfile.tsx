import Link from 'next/link';

interface Props {
    user: any
    username: string
    
}
export default function UserProfilePage(props: Props): any {
    const { user, username} = props;


    return (
        <>
            <div className="min-h-full">
                <main className="py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">

                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    {/* <AvatarUploader /> */}
                                    {/* <button onClick={() => changeAvatar(true)}> */}
                                    <img className="h-16 w-16 rounded-full btn" src={user.avatarUrl? user.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
                                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                                    {/* </button> */}
                                </div>
                            </div>
                        <div>

                        <div className="flex space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">{user.username} </h1>
                        <Link href={`/${username}/edit`}>
                            Edit
                            </Link>
                        </div>
                        <p className="text-sm font-medium text-gray-500">{user.intro}</p>
                        {/* <div className="mt-6"></div> */}

                        
                        <div className="mt-2">
                        <ul className="flex space-x-4">
                            <li className="flex items-center space-x-1">
                                <a href={user.instagram} className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png"/>{user.instagram? "ins" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png"/>{user.twitter? "twi" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/material-outlined/30/000000/globe--v3.png"/>{user.website? "web" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/discord-logo.png"/>{user.discord || 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/weixing.png"/>{user.wechat || 'N/A'}
                                </a>
                            </li>

                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-filled/30/000000/apple-mail.png"/>{user.email || 'N/A'}
                                </a>
                            </li>

                    
                        </ul>
                    </div>

                    </div>
                    </div>
                    {/* <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"> */}
          <div className='mb-2'>
              
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                <strong>Communities</strong>
                {/* <CommunityStack /> */}
            </h2>
          </div>
          {/* </div> */}

                    {/* <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">Disqualify</button>
                        <button type="button" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">Advance to offer</button>
                    </div> */}
                    </div>
                    
                </main>   
        </div>

        {/* <div className="box-center">
            <img src={user.photoURL || '/hacker.png'} className="card-img-center" />
            <p>
            <i>@{user.username}</i>
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1>
    </div> */}
    </>
    )
}