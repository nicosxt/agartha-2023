import Link from 'next/link'
import CommunityFeed from '../../components/communities/CommunityFeed';

interface Props {
    communities: any
}
export default function ManageCommunity(props: Props): any {
    // search the community where the user has admin access, display the community under Manage communities. 

    const {communities} = props;
    // console.log("manage communities", communities)

    return (
        <>


            <div className="min-h-full">
                <main className="py-10">  
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
          
                        <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600">Manage Communities</h1>
                        <p className="text-sm font-medium text-gray-500">Communities that you have admin access to.</p>
        
                         <div className="pt-8">
                        <Link href='/communityAdmin'>
                        <a  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-bold">+ Create a New Community</a>
                        </Link>
                        </div>
                    </div>
                    
                    </div>

                    </div>
                    <CommunityFeed communities={communities}/>

                    
                </main>   
        </div>
    </>
    )
}