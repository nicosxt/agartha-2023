import Link from 'next/link';
export default function CommunityStack(props:any): any {
    const {communities} = props;
    return communities ? communities.map((community:any) =><CommunityItem community={community}/>) : null;
}


function CommunityItem(props:any) {
    const {community} = props;
    return (
        <>
        <Link href={`/community/${community.slug}`}>
        <a href="#" className="text-sm font-medium text-gray-500">

         <img
          className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={community.avatarUrl? community.avatarUrl : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg" }
          alt=""
        ></img>
        </a>
        {/* <p>{community.communityName}</p> */}
        </Link>
        </>
    );
}