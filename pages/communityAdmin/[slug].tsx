
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { firestore } from '../../lib/firebaseConfig/init'
import { doc, getDoc, getDocs,collection } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AuthCheck from "../../components/misc/authcheck";
import EditCommunityProfile from "../../components/communities/EditCommunityProfile";
import { getCommunityWithSlug } from "../../lib/firebaseConfig/init";
import { communityToJSON } from "../../lib/firebaseConfig/init";
import { useRouter } from 'next/router';
import { useEffect, useState} from "react";

export default function EditCommunity(): any {
    return(
        <AuthCheck>
            <CommunityManager />
        </AuthCheck>
    );

}

function CommunityManager() {

    const router = useRouter();
    const {slug} = router.query;
    const [members, setMembers] = useState<any>([]);
    // console.log("----", slug);
    const auth = getAuth();
    const uid:string = auth?.currentUser?.uid!;

    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const communityRef = doc(firestore, "communities", realSlug);
    const userCommunityRef = doc(firestore, "users", uid, "communities", realSlug);
    const communityMemberRef= doc(firestore, "communities", realSlug, "members", uid);

    let communityMemberSnap;
    useEffect( () => {
        const getMemberDoc = async () => {
            communityMemberSnap = (await getDocs(collection(firestore, "communities", realSlug, "members")));
            if (communityMemberSnap) {
                setMembers(communityMemberSnap);
            }
        }
        getMemberDoc();
    }, [communityMemberSnap]);

    //need to get a list of uids 


    const [community] = useDocumentData(communityRef);

    return (
        <main>
        {community && (
            <EditCommunityProfileForm 
            communityRef={communityRef} communityMemberRef={communityMemberRef} communityMemberSnap={members} userCommunityRef={userCommunityRef} defaultValues={community} />
        )}
        </main>
    );
}


interface Props {
    defaultValues: any,
    communityRef: any,
    userCommunityRef: any,
    communityMemberSnap: any,
    communityMemberRef: any

  }

function EditCommunityProfileForm(props:Props) {
    const {defaultValues, communityRef, communityMemberSnap, communityMemberRef, userCommunityRef} =props;
  
    return (
      <>
      <EditCommunityProfile 
      communityRef={communityRef} communityMemberRef={communityMemberRef} communityMemberSnap={communityMemberSnap} userCommunityRef={userCommunityRef} defaultValues={defaultValues}/>
      </>
    );
  }