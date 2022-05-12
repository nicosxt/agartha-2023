import Link from 'next/link'

interface Props {
    communities: any
    admin: boolean
}
export default function ManageCommunity(props: Props): any {
    // search the community where the user has admin access, display the community under Manage communities. 

    const {communities, admin} = props;

    return (
        <>
            <div className="min-h-full">
                <main className="py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                            </div>
                        <div>
                        <h1 className="text-2xl font-bold text-gray-900">Manage Communities</h1>
                        <Link href='/communityAdmin'>
                        <a href="#" className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">+ Create a New Community</a>
                        </Link>
                    </div>
                    </div>

                    </div>
                    
                </main>   
        </div>
    </>
    )
}