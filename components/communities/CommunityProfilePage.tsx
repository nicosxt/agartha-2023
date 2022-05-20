import Link from 'next/link';
import ImageFeed from '../imgs/ImageFeed';
import MemberStack from '../members/MemberStack';
import { useContext, useState, useEffect} from 'react';
import { authContext } from '../../lib/authContext'
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import { getUserWithUsername, communityToJSON, memberToJSON} from '../../lib/firebaseConfig/init';
import { firestore } from '../../lib/firebaseConfig/init'


export default function CommunityProfilePage(props : any) {
    const community = props.community;
    const { uid } = useContext(authContext);
    // console.log("uid", uid)
    const [userCommunityDoc, setUserCommunityDoc] = useState<any>()
    const [admin, setAdmin] = useState<boolean>(false);
    let newUserCommunityDoc:any;
    // console.log("1", newUserCommunityDoc);
    useEffect(() => {
        const getUser = async () => {
            // const newUser = memberToJSON(user);
                if(uid) {
                const userCommunityRef = doc(firestore, "users", uid, "communities", community.slug);
                const data = await getDoc(userCommunityRef);
                newUserCommunityDoc = communityToJSON(data);
                setUserCommunityDoc(newUserCommunityDoc);
                const realAdmin = newUserCommunityDoc.admin;
                setAdmin(realAdmin);
                    if (userCommunityDoc) {
                        setAdmin(userCommunityDoc.admin);
                        // console.log("ADMIN", userCommunityDoc.admin)
                    }
            }
        }
    getUser();
}, [uid])
        

    return(
        <>
            <div className="min-h-full">
                <main className="py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">

                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    {/* <AvatarUploader /> */}
                                    {/* <button onClick={() => changeAvatar(true)}> */}
                                    <img className="h-16 w-16 rounded-full btn" src={community.avatarUrl? community.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }alt=""/>
                                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                                    {/* </button> */}
                                </div>
                            </div>
                        <div>

                        <div className="flex space-x-2">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500">{community.communityName} </h1>
                        {admin &&
                        <Link href={`/communityAdmin/${community.slug}`}>
                            Edit
                            </Link>
                        }
                        </div>
                        <p className="text-sm font-medium text-gray-500">{community.intro}</p>
                        {/* <div className="mt-6"></div> */}

                        
                        <div className="mt-2">
                        <ul className="flex space-x-4">
                        <li className="flex items-center space-x-1">
                                <a href={community.instagram} className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/material-outlined/30/000000/home--v2.png"/>{community.city? (community.city + ", "+ community.state + ", "+ community.country) : 'N/A'}
                                </a>
                            </li>

                            <li className="flex items-center space-x-1">
                                <a href={community.instagram} className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png"/>{community.instagram? "ins" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/twitter--v1.png"/>{community.twitter? "twi" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/material-outlined/30/000000/globe--v3.png"/>{community.website? "web" : 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/discord-logo.png"/>{community.discord || 'N/A'}
                                </a>
                            </li>
                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-glyphs/30/000000/weixing.png"/>{community.wechat || 'N/A'}
                                </a>
                            </li>

                            <li className="flex items-center space-x-1">
                                <a href="#" className="text-sm font-medium text-gray-500">
                                <img src="https://img.icons8.com/ios-filled/30/000000/apple-mail.png"/>{community.email || 'N/A'}
                                </a>
                            </li>

                    
                        </ul>
                    </div>

                    </div>
                    </div>
          </div>
</main>
</div>
        </>
    );

}