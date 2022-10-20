
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { firestore } from '../../../lib/firebaseConfig/init'
import { doc, getDoc, getDocs,collection, query } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AuthCheck from "../../../components/misc/authcheck";
import EditCommunityProfile from "../../../components/communities/EditCommunityProfile";
import { getCommunityWithSlug } from "../../../lib/firebaseConfig/init";
import { communityToJSON } from "../../../lib/firebaseConfig/init";
import { useRouter } from 'next/router';
import { useEffect, useState} from "react";
import { useContext } from 'react';
import { authContext } from '../../../lib/authContext'

export async function getServerSideProps(context:any){
    const {query:qr} = context;
    const {slug} = qr;
    return {
        props: {slug}
    }
}

export default function EditCommunity(props:any): any {
    const [slug, setSlug] = useState<any>(props.slug);
    console.log("slug is", slug);
    useEffect(() => {
        // setSlug(props.slug);
    }, [slug]);
    return(
        // <AuthCheck>
            <CommunityManager slug={slug} />
        // </AuthCheck>
    );

}


function CommunityManager(props:any) {

    // const router = useRouter();
    // const {slug} = router.query;
    const [community, setCommunity] = useState<any>(null);
    const [communitiyRef, setCommunityRef] = useState<any>(null);

    const [slug , setSlug] = useState<any>(props.slug);
    console.log("----", slug);
    

    useEffect(() => {
        const getCommunityData = async () => {

            if(slug){
                const communityRef = doc(firestore, "communities", slug);
                const communityDoc = await getDoc(communityRef);
                const communityData = communityDoc.data();
                console.log("communityData is", communityData);
                setCommunity(communityData);
                setCommunityRef(communityRef);
            }
        }
        getCommunityData();
    }, [slug]);
    


    //need to get a list of uids 



    return (
        <main>
        {community && communitiyRef && (
            <EditCommunityProfileForm 
            username={null} communityRef={communitiyRef} communityMemberRef={null} communityMemberSnap={null} userCommunityRef={null} defaultValues={community} />
        )}
        </main>
    );
}


interface Props {
    defaultValues: any,
    communityRef: any,
    userCommunityRef: any,
    communityMemberSnap: any,
    communityMemberRef: any,
    username: any

}

function EditCommunityProfileForm(props:Props) {
    const {defaultValues, communityRef, communityMemberSnap, communityMemberRef, userCommunityRef} =props;
  
    return (
      <>
      <EditCommunityProfile 
      username={props.username}
      communityRef={communityRef} communityMemberRef={communityMemberRef} communityMemberSnap={communityMemberSnap} userCommunityRef={userCommunityRef} defaultValues={defaultValues}/>
      </>
    );
  }