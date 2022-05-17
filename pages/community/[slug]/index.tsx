import { getCommunityWithSlug, communityToJSON, memberToJSON, postToJSON } from '../../../lib/firebaseConfig/init';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import {firestore} from '../../../lib/firebaseConfig/init';
import PostContent from '../../../components/users/PostContent'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import CommunityProfilePage from '../../../components/communities/CommunityProfilePage';
import PostFeed from '../../../components/users/PostFeed';
import Link from 'next/dist/client/link';
import MemberStack from '../../../components/members/MemberStack';

export async function getStaticProps(context:any) {
    const {params} = context;
    const {slug} = params; // grab the slug from the url parameters
    // console.log("----", slug);
    const communityDoc = await getCommunityWithSlug(slug);
    let community;
    let path;
    let members;

    if (!communityDoc) {
        return {
            notFound: true,
        };
    }

    if (communityDoc) {
        const communityRef = doc(firestore, "communities", slug);
        const communityQuery= query(collection(firestore, "communities", slug, "members"));
        const membersSnapshot = await getDocs(communityQuery);
        members = membersSnapshot.docs.map(d => d.id);
        community = communityToJSON(await getDoc(communityRef));
        path = communityRef.path;
    }
    // console.log("hjmm", path);

    //get members' posts query for the community
    //for each user, get their posts
    // const members = community.members;
    const postsQuery  = query(collectionGroup(firestore, "posts"), where("uid", "in", members));
    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    const membersQuery = query(collection(firestore, "users"), where("uid", "in", members))
    const membersInfo = (await getDocs(membersQuery)).docs.map(memberToJSON);


    return {
      props: { community, path, posts, membersInfo },
      revalidate: 5000,
    };
  }

  //find out which community doc to render
export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collection(firestore, 'communities'));
    const paths = snapshot.docs.map((doc) => {
        const { slug } = doc.data();
        return {
        params: {slug},
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

export default function Community(props:any) {

    const communityRef = doc(firestore, props.path);
    const [realtimeCommunity] = useDocumentData(communityRef);
    const community = realtimeCommunity || props.community;
    const membersInfo = props.membersInfo;
    // console.log("heyyyyasfasa");
    // console.log(community.slug)
    // console.log(props.community.slug)


    return (
        <main>
            <CommunityProfilePage community={community}/>
            <p className="text-2xl ml-10">Members</p>

            <Link href={`/community/${community.slug}/members`}>
                <MemberStack slug={community.slug} membersInfo={membersInfo} />
            </Link>
            <br></br>
            <p className="text-2xl ml-10">Member Posts</p>
            <PostFeed posts={props.posts} admin={false} />
        </main>
    );
}