import Head from 'next/head'

const ColivingEvent = () => {
    return (
        <>

            <Head>
                <title>June Coliving Event Host</title>
            </Head>

                {/* <img className="absolute top-0 left-0 border border-white border-2 w-screen h-60 object-cover blur-sm" src="/coliving/bg.jpeg" /> */}
                <img  src="/coliving/bg.jpeg" />

                <div className=" bg-white ">


                    <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">

                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-[#0000FF] sm:text-5xl sm:tracking-tight lg:text-4xl font-mono">Coliving with Agartha at Ashland, Oregon, USA</h1>
                            <p className="mt-4 text-lg leading-6 text-[#0000FF] font-mono">Join our community of like-minded individuals in a beautiful shared cabin this June.</p>

                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-1 sm:gap-5 lg:grid-cols-3 font-mono ">
                            <div className="bg-white rounded-lg border border-2 border-[#0000FF] bg-[#FFDDED] ">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-bold text-[#0000FF] ">Location</h3>
                                    <div className="mt-2 text-sm text-[#0000FF]">
                                        <p><a className='font-bold' href="https://newfrontierranch.com">New Frontier Ranch</a> - in the middle of some seriously awesome nature in Oregon. It's a state that's all about nature, with tons of natural resources, and people who really care about taking care of the land through permaculture. </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-2 border-[#0000FF] bg-[#FFDDED] ">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-bold text-[#0000FF]">Accommodations</h3>
                                    <div className="mt-2 text-sm text-[#0000FF]">
                                        <p><a className='font-bold' href="https://newfrontierranch.com/accomodations">New Frontier Ranch's Lakeview Cabin </a>- We will be living in a cabin that potentially lives 10-12 people, with other options such as tipis or bunkalows available, you can also bring your own van! See below for more details.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-2 border-[#0000FF] bg-[#FFDDED] ">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-bold text-[#0000FF]">Activities</h3>
                                    <div className="mt-2 text-sm text-[#0000FF]">
                                        <p>Daily Meditation + Yoga 🧘‍♀️
                                            Fire Spinning Classes 🔥
                                            Eco Villages Visit 🛖
                                            Permaculture Workshops 🌱
                                            Hiking + Hot Springs♨️
                                            Group Cooking🍳
                                            Open Mic 🎤 +
                                            Autentic Relating / NVC Sessions 🤝
                                            ... Something you propose!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img  src="/coliving/cabin.jpeg" />

                        <div className="mt-16 text-center">
                            <p className="text-lg leading-6 font-medium text-gray-900">Ready to join us this June?</p>
                            <div className="mt-6">
                                <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Submit Application
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </>)
}

export default ColivingEvent
