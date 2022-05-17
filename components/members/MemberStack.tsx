import Link from "next/dist/client/link"
import MemberAvatarStack from "./MemberAvatarStack";

export default function MemberStack(props:any) :any{
    const slug = props.slug;
    const membersInfo = props.membersInfo;

    return (
    <>
    <div className="bg-white overflow-hidden sm:rounded-md">
    <Link href={`/community/${slug}/members`}>

        <a className="block hover:bg-gray-50">
            
                <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">

                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden -space-x-1">
                        <MemberAvatarStack membersInfo={membersInfo}/>
                    </div>
                    </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </div>
                </div>
            </a>
            </Link>

            </div>
         </>
      )
}