import Link from 'next/link';
import { useContext } from 'react';
import { authContext } from '../../lib/authContext'


export default function AuthCheck(props:any) {
    const { username } = useContext(authContext);
  
    return username ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
  }