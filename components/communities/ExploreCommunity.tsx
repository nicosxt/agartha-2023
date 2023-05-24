import CommunityFeed from "./CommunityFeed";
interface Props {
  communities: any;
  username: any;
}
export default function ExploreCommunity(props: Props): any {
  const { communities, username } = props;
  // console.log("explore community" , communities)
  return (
    <>
      <div className="min-h-full">
        <main className="py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div></div>
            </div>
          </div>
          <CommunityFeed username={username} communities={communities} />
        </main>
      </div>
    </>
  );
}
