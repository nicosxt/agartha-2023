
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { firestore } from '../../lib/firebaseConfig/init'
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AuthCheck from "../../components/misc/authcheck";
import EditCommunityProfile from "../../components/communities/EditCommunityProfile";
import { getCommunityWithSlug } from "../../lib/firebaseConfig/init";
import { communityToJSON } from "../../lib/firebaseConfig/init";
import { useRouter } from 'next/router';

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
    console.log("----", slug);
    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const communityRef = doc(firestore, "communities", realSlug);
    const [community] = useDocumentData(communityRef);

    return (
        <main>
        {community && (
            <EditCommunityProfileForm communityRef={communityRef} defaultValues={community} />
        )}
        </main>
    );
}


interface Props {
    defaultValues: any,
    communityRef: any,
  }

function EditCommunityProfileForm(props:Props) {
    const {defaultValues, communityRef} =props;
  
    return (
      <>
      <EditCommunityProfile communityRef={communityRef} defaultValues={defaultValues}/>
      </>
    );
  }