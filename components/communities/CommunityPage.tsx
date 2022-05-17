import CommunityStack from "./CommunityStack";

export default function CommunityPage(props:any): any {
    const {communities} = props;

    return (
        <>
            <div className="min-h-full">
                <main className="py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                            </div>
                        <div>
                        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                        <p className="text-sm font-medium text-gray-500">Communities that you are a part of.</p>
                        <div className="pt-8">

                        <CommunityStack communities={communities}/>
                        </div>

                    </div>
                    </div>

                    </div>
                    
                </main>   
        </div>
    </>
    )
}