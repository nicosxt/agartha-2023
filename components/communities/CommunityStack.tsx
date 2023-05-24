import Link from "next/link";
export default function CommunityStack(props: any): any {
  const { communities, username } = props;
  return communities
    ? communities.map((community: any) => (
        <CommunityItem
          community={community}
          username={username}
          key={community.slug}
        />
      ))
    : null;
}

function CommunityItem(props: any) {
  const { community, username } = props;
  return (
    <>
      <Link
        href={`/${username}/community/${community.slug}`}
        className="text-sm font-medium text-gray-500"
      >
        <img
          className="relative z-0 inline-block h-20 w-20 rounded-full ring-2 ring-white"
          src={
            community.avatarUrl
              ? community.avatarUrl
              : "https://s2.loli.net/2022/05/02/bftaDElM8VYuxn5.jpg"
          }
          alt=""
        ></img>
      </Link>
    </>
  );
}
