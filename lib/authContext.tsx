import { useState, useEffect, useContext, createContext } from 'react'
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { setCookie, destroyCookie} from 'nookies'
import { onSnapshot, doc } from 'firebase/firestore';
import { firestore } from './firebaseConfig/init';

export type TIdTokenResult = { 
  //https://firebase.google.com/docs/reference/node/firebase.auth.IDTokenResult
  //Interface representing ID token result obtained from firebase.User.getIdTokenResult
  token: string;
  expirationTime: string;
  authTime: string;
  issuedAtTime: string;
  signInProvider: string | null;
  signInSecondFactor: string | null;
  claims: {
    [key: string]: any;
  };
}

type Props = {
  children: React.ReactNode;
};

type UserContext ={
  username: null
  user: TIdTokenResult | null, //type | props 
  loading: boolean
  uid: string 
}

export const authContext = createContext<UserContext>({
  username: null,
  user: null,
  loading: true,
  uid: ""
});

export default function  AuthContextProvider({children} : Props) {
  // what i'm trying to do 
  // add a username to it 
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState<TIdTokenResult | null>(null); // useState has to have a type and props defined
  const [loading, setLoading] = useState(true); //
  const [uid, setUid] = useState("");

  useEffect(()=>{
    const auth=getAuth()
    onAuthStateChanged(auth, (user) => {

        //user returned from firebase not the state
        if (user) {
            // Save token for backend calls
            user.getIdToken().then(( token )=> setCookie(null, 'idToken', token, {
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            }))
            // Save decoded token on the state
            user.getIdTokenResult().then(( result ) => setUser(result))
            const userUid = user.uid;
            // console.log("userUid", userUid)
            onSnapshot(doc(firestore, "users", userUid), (doc) => {
              setUsername(doc.data()?.username);
              setUid(userUid);
            })
        } else {
          setUsername(null);
        }
        if (!user) setUser(null)
        setLoading(false)

      });

  },[])

  return <authContext.Provider value={{username, user, uid, loading}}>{children}</authContext.Provider>;

}

export const useAuth = () => useContext(authContext);

export const signOut = async () => {
  const auth =getAuth()
  destroyCookie(null, 'idToken')
  await signout(auth)
 
} 
