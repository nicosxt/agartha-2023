import Link from "next/link";
import CommunityFeed from "../../components/communities/CommunityFeed";

interface Props {
  communities: any;
  username: any;
}
export default function ManageCommunity(props: Props): any {
  // search the community where the user has admin access, display the community under Manage communities.

  const { communities, username } = props;
  // console.log("manage communities", communities)

  return (
    <>
      <div className="min-h-full">
        <main className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div>
                <div className="pt-8"></div>
              </div>
            </div>
          </div>
          <CommunityFeed username={username} communities={communities} />
        </main>
      </div>
    </>
  );
}
