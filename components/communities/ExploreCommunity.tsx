import CommunityFeed from "./CommunityFeed"
interface Props {
    communities: any
    admin: boolean
}
export default function ExploreCommunity(props: Props): any {
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
                        <h1 className="text-2xl font-bold text-gray-900">Explore Communities</h1>

                    </div>
                    </div>

                    </div>
                    <CommunityFeed communities={communities} admin={false}/>

                </main>   
        </div>
    </>
    )
}