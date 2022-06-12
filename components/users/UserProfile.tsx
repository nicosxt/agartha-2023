import Link from 'next/link';
import { useAuth,signOut } from '../../lib/authContext'
import PostFeed from './PostFeed';

interface Props {
    user: any
    username: string
    
}
export default function UserProfilePage(props: Props): any {
    const { user, username} = props;


    return (
        <>
            <div className="min-h-full">
            <h1 className="text-2xl text-center font-semibold text-gray-900">Profile</h1>

                <div className="mt-6 flex-shrink-0 flex border-t border-gray-200 p-4"/>
                <div className="grid place-items-center" >
           

                        <img className="h-16 w-16 rounded-full btn" src={user.avatarUrl? user.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
                        <div className='mt-8'>

                        <p className="text-sm font-medium text-gray-500">{user.intro}</p>
                        </div>
                
                <div className='mt-8'>
                        <ul className="flex space-x-4">
                            <li className="flex items-center space-x-1">
                                <a href={user.instagram} className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png"/>{user.instagram? "ins" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href={user.twitter} className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png"/>{user.twitter? "twi" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href={user.website} className="text-sm font-medium text-gray-500">
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


    </>
    )
}