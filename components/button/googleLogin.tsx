
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
        <Button colorScheme='blue' variant='outline' onClick={loginWithGoogle}>
        <img src={'/google.png'} width="30px" />
        Login with Google</Button>
    </div>
}