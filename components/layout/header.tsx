import { useAuth,signOut } from '../../lib/authContext'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'

export default function Header(props : any){
    const { user, loading} = useAuth()

    return <div className="flex h-full flex-row">

        <div className="flex-1 my-auto">
        <Link href='/'>
            <button >Home</button>
        </Link>
        </div>

        <div className="m-auto space-x-2">
            

        {!user && !loading? 
        
        <>
        <Link href='/signin'><Button className="m-auto"> <b>Log In</b></Button></Link>

        <Link href='/signup'>
            <Button 
                fontFamily={'heading'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
            }}> 
            
        Sign Up</Button></Link>

        </>
        :null}
        {user?<>
        
        <Link href='/privatessr'><button > PrivateSSR</button></Link>

        <Link href='/private'><button > Private</button></Link>

        <button onClick={signOut}> Signout</button>
        
        </>:null}

        </div>
        
    </div>
}