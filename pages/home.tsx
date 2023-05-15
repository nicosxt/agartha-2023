import Head from 'next/head'
import { useState } from 'react';
import Link from 'next/link'
import { useAuth, signOut } from '../lib/authContext'

/**
 * Todo:
 * - Home page is map/list view
 */


interface Props {
    posts: any
}

export default function Home(props: Props): any {
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);
    const { user } = useAuth();

    const [isHovering, setIsHovered] = useState(false);

    return (
        <>
            <Head>
                <title>Agartha</title>
            </Head>
            <main className="min-h-screen  relative bg-white">
            </main>
        </>
    )
}