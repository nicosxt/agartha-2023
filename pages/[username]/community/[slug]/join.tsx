import MemberFeed from "../../../../components/members/MemberFeed";
import { useRouter } from "next/router";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { firestore, storage, memberToJSON } from '../../../../lib/firebaseConfig/init';
import { useDocumentData } from "react-firebase-hooks/firestore";
import { communityToJSON } from "../../../../lib/firebaseConfig/init";
import AddMemberForm from "../../../../components/members/AddMemberForm";
import JoinCommunityForm from "../../../../components/members/JoinCommunityForm";
export async function getStaticProps(context:any)  {
    const {params} = context;
    const {slug} = params;
    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const communityQuery= query(collection(firestore, "communities", slug, "members"));
    const membersSnapshot = await getDocs(communityQuery);
    const members = membersSnapshot.docs.map(d => d.id);
    const membersQuery = query(collection(firestore, "users"), where("uid", "in", members))
    const membersInfo = (await getDocs(membersQuery)).docs.map(memberToJSON);
    // console.log("slug" + realSlug)
    return{
        props: {membersInfo, realSlug},
        revalidate: 5000,
    };

}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collection(firestore, 'communities'));
    const paths = snapshot.docs.map((doc) => {
        const { slug } = doc.data();
        const username = "123";  
        return {
        params: {slug, username},
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

interface Props {
    membersInfo: any 
    realSlug: string
}

export default function JoinCommunity(props: Props) {
    const realSlug = props.realSlug;
    const membersInfo = props.membersInfo;
    return(
        <>
       <JoinCommunityForm slug={realSlug}/>
        </>
    );

}
