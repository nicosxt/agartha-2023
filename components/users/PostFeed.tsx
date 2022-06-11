import Link from 'next/link';

interface Props {
    posts: any
    admin: boolean
}

export default function PostFeed(props: Props): any {
    const {posts, admin} = props;
    return posts ? posts.map((post:any) =><PostItem post={post} key={post.slug} admin={admin} />) : null;
}

interface PostProps{
    post: any
    admin: boolean
}


function PostItem(props: PostProps) : any {
    const post = props.post;
    const admin = props.admin;
    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
      <>
        <div className="mt-8 max-w-3xl mx-auto gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">

            <ul role="list" className="divide-y divide-gray-200">
                <li>
                <Link href={`/${post.username}/${post.slug}`}>

                <a className="block hover:bg-gray-50">
                    <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                        <div className="flex text-sm">
                            {/* <a> */}
                            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</p>
                            {/* </a> */}
                        </div>
              
                        <div className="flex">
                            {/* <div className="flex items-center text-sm text-gray-500"> */}
                            <p className="mt-1 max-w-2xl text-sm text-gray-500"> 
                            <Link href={`/${post.username}`}>
                            <a>
                              <i>By @{post.username} </i>
                            </a>
                            

                          </Link> {' '} on {createdAt.toISOString()} </p>
                 
                        </div>
        
                

                        </div>
      
                    </div>
                    <div className="ml-5 flex-shrink-0">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                </a>
                </Link>

            </li>

          </ul>
        </div>
        </div>
    </>
    );


}