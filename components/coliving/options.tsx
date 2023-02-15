import Head from 'next/head'
import Image from 'next/image'

const accommodations = [
    {
        id: 1,
        name: 'Cozy Cottage',
        image: '/cottage.jpg',
        description: 'A lovely little cottage in the countryside.',
        beds: 2,
        baths: 1,
        guests: 4,
        price: 100,
    },
    {
        id: 2,
        name: 'Luxury Villa',
        image: '/villa.jpg',
        description: 'A luxurious villa with a private pool and stunning views.',
        beds: 4,
        baths: 3,
        guests: 8,
        price: 300,
    },
    {
        id: 3,
        name: 'Beach House',
        image: '/beach.jpg',
        description: 'A beautiful beach house just steps from the ocean.',
        beds: 3,
        baths: 2,
        guests: 6,
        price: 200,
    },
]

export default function Accommodations() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Head>
                <title>Accommodations List</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="space-y-8">
                {accommodations.map((accommodation) => (
                    <div key={accommodation.id} className="flex items-center">
                        <div className="flex-shrink-0 h-48 w-48 relative">
                            <Image
                                src={accommodation.image}
                                layout="fill"
                                objectFit="cover"
                                alt={accommodation.name}
                            />
                        </div>
                        <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">{accommodation.name}</h2>
                                <div className="font-bold text-gray-700">${accommodation.price}/night</div>
                            </div>
                            <p className="mt-2 text-gray-600">{accommodation.description}</p>
                            <div className="mt-2 flex items-center">
                                {/* <FaBed className="text-gray-600" /> */}
                                <span className="text-gray-600 ml-1">{accommodation.beds} beds</span>
                                {/* <FaBath className="text-gray-600 ml-4" /> */}
                                <span className="text-gray-600 ml-1">{accommodation.baths} baths</span>
                                {/* <FaUser className="text-gray-600 ml-4" /> */}
                                <span className="text-gray-600 ml-1">{accommodation.guests} guests</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
