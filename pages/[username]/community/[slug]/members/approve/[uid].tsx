import MemberFeed from "../../../../../../components/members/MemberFeed";
import { useRouter } from "next/router";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { firestore, storage, memberToJSON } from '../../../../../../lib/firebaseConfig/init';
import { useDocumentData } from "react-firebase-hooks/firestore";
import { communityToJSON } from "../../../../../../lib/firebaseConfig/init";
import ApproveMemberForm from "../../../../../../components/members/ApproveMemberForm";
export async function getStaticProps(context:any)  {
    const {params} = context;
    const {slug, uid} = params;
    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const realUid:string = Array.isArray(uid)?uid[0]:uid!;


    return{
        props: { realSlug, realUid},
        revalidate: 5000,
    };

}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collection(firestore, 'communities'));
    const paths = snapshot.docs.map((doc) => {
        const { slug } = doc.data();
        const username = "123";  
        const uid = "123";
        
        return {
        params: {slug, username, uid},
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

interface Props {
    realSlug: string
    realUid: string
}

export default function ApproveMembers(props: Props) {
    const realSlug = props.realSlug;
    const realUid = props.realUid;
    return(
        <>
       <ApproveMemberForm slug={realSlug} uid={realUid}/>
        </>
    );

}
