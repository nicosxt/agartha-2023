import Link from 'next/link';
import { Container } from '@mui/material'


interface Props {
    communities: any
    admin: boolean
}

export default function CommunityFeed(props: Props): any {
    const {communities, admin} = props;
    return communities ? communities.map((community:any) =><Community community={community} key={community.slug} admin={admin} />) : null;
}

interface PostProps{
    community: any
    admin: boolean
}

function Community(props: PostProps) : any {
    const community = props.community;
    const admin = props.admin;
    
    return (
      <>
        <div className="mt-8 max-w-3xl mx-auto gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <ul role="list" className="divide-y divide-gray-200">
                <li>
                <a href={`/community/${community.slug}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                        <div className="flex text-sm">
                          <Link href={`/community/${community.slug}`}>
                            <a>
                            <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{community.communityName}</p>
                            </a>
                          </Link>
                        </div>
                        <div className="flex space-x-4">
                          {admin && (
                              <>
                                <Link href={`/admin/${community.slug}`}>
                                  <h3>
                                    <button className="btn-blue">Edit</button>
                                  </h3>
                                </Link>
                                {community.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
                              </>
                            )}
                        </div>

                        </div>
                        <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex overflow-hidden -space-x-1">
                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Dries Vincent"/>

                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Lindsay Walton"/>

                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Courtney Henry"/>

                            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Tom Cook"/>
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
            </li>
          </ul>
        </div>
        </div>

    </>
    );


}