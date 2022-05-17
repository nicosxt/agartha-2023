
import { Button } from '@chakra-ui/react'
import { getAuth, GoogleAuthProvider , signInWithPopup } from "firebase/auth";

export default function SignInWithGoogle(props : any){
    //https://firebase.google.com/docs/auth/web/google-signin
    const  loginWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    return <div>
        <button type="button" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={loginWithGoogle}>
        <img src={'/google.png'} width="30px" />
        </button>
    </div>
}