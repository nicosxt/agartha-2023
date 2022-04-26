import Link from 'next/link';
import ImageFeed from '../imgs/ImageFeed';


export default function DisplayForm(props : any) {
    const post = props.post;
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return(
        <>
            <div className="py-10 space-y-8 divide-y divide-gray-200 md:space-x-5 lg:max-w-7xl lg:px-8 md:items-center md:justify-between max-w-3xl mx-auto px-4 sm:px-6 ">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{post?.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">by{' '}
                    <Link href={`/${post.username}/`}>
                        <a className="text-info">@{post.username}</a>
                    </Link>{' '}
                    on {createdAt.toISOString()}</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Community</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">706NY, Mars College</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.content}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Avability</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.movein} to {post?.moveout}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.price} {post?.currency} per night</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{post?.street}, {post?.city}, {post?.state}, {post.country}, {post.zipcode}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                    <dt className="text-sm font-medium text-gray-500">Photos</dt>
                    <dd className="grid grid-cols-2 gap-4 flex items-center mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ImageFeed urls={post.images}/>
                    </dd>

                   
                </div>
                </dl>
            </div>
            </div>

        </>
    );

}