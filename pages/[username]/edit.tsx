
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { firestore } from '../../lib/firebaseConfig/init'
import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import EditUserProfile from "../../components/users/EditUserProfile";
import { useContext, useState } from 'react';
import { authContext } from '../../lib/authContext'
import AuthCheck from "../../components/misc/authcheck";


export default function EditUser(): any {
    return(
        <AuthCheck>
            <EditUserProfileManager />
        </AuthCheck>
    );

}

function EditUserProfileManager() {
    const { username } = useContext(authContext);
    // console.log("66666")
    // console.log(username)
    const auth = getAuth();
    const uid:string = auth?.currentUser?.uid!;
    // console.log(uid)
    const userRef = doc(firestore, "users", uid);
    // console.log(userRef.path)    
    const [user] = useDocumentData(userRef);
    // console.log(user)
    return (
        <main>
        {user && (

            <EditUserProfileForm userRef={userRef} defaultValues={user} username={username} />

        )}
        </main>
    );
}


interface Props {
    defaultValues: any,
    userRef: any,
    username: any
  }

function EditUserProfileForm(props:Props) {
    const {defaultValues, userRef, username} =props;
  
    return (
      <>
      <EditUserProfile userRef={userRef} defaultValues={defaultValues} username={username}/>
      </>
    );
  }