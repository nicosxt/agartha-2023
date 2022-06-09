import EditMemberForm from '../../../../../components/members/EditMemberForm';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import {firestore} from '../../../../../lib/firebaseConfig/init';
import { getUserWithUsername, postToJSON, memberToJSON, communityToJSON} from '../../../../../lib/firebaseConfig/init';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export async function getStaticProps(context:any) {
    const {params} = context;
    const {slug, uid} = params; // grab the id from the url parameters
    // console.log("-----")

    // console.log(slug)
    // console.log(uid)
    // console.log("-----")
    let member;

    const memberRef = doc(firestore, "communities", slug, "members", uid);
    const path = memberRef.path;
    const memberDoc= await getDoc(memberRef);
    // console.log(memberDoc.data())
    if(memberDoc){
        member = memberToJSON(memberDoc);
    }

    return {
        props: {member, slug, path},
        revalidate: 5000,
    };
}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collectionGroup(firestore, 'members'));
    const paths = snapshot.docs.map((doc) => {
        // console.log("doc", doc)
        const { slug, uid } = doc.data();
        const username="123";
        return {
        params: {slug, username, uid},
        };
    });
    // console.log("paths", paths)

    return {
        paths,
        fallback: 'blocking',
    };
}



export default function EditMembers(props: any) {
    const slug = props.slug;
    const memberRef = doc(firestore, props.path);
    const [realtimeMember] = useDocumentData(memberRef);
    const member = realtimeMember || props.member;


    return(
        <>
       <EditMemberForm defaultValues={member} slug={slug} />
        </>
    );

}