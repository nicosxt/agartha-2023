import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { firestore, storage, memberToJSON } from '../../../../lib/firebaseConfig/init';
import JoinCommunityForm from "../../../../components/members/JoinCommunityForm";
export async function getStaticProps(context:any)  {
    const {params} = context;
    const {slug} = params;
    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const communityQuery= query(collection(firestore, "communities", slug, "members"));
    const membersSnapshot = await getDocs(communityQuery);
    let membersInfo:any[] = [];

    let members = membersSnapshot.docs.map(d => d.id);

    if (members.length) {
        members = members.filter((v:any, i:any, a:any) => a.indexOf(v) === i);

        const membersQuery = query(collection(firestore, "users"), where("uid", "in", members))
        membersInfo.push(...(await getDocs(membersQuery)).docs.map(memberToJSON));
    }
    return{
        props: {membersInfo, realSlug},
        revalidate: 5,
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
    return(
        <>
       <JoinCommunityForm slug={realSlug}/>
        </>
    );

}
