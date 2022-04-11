import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { useAuth } from '../../lib/authContext'
import { useContext, useState } from 'react';
import AuthCheck from "../../components/misc/authcheck";
import { useCollection } from 'react-firebase-hooks/firestore';
import { doc, getDoc, collection, addDoc, setDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import { authContext } from '../../lib/authContext'
import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import PostFeed from "../../components/users/PostFeed";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';


export default function AdminPostsPage(props:any) {
    return (
      <main>
        <AuthCheck>
          <PostList />
          <CreateNewPost />
        </AuthCheck>
      </main>
    );
  }

export function PostList() {
    const auth = getAuth();
    const { username } = useContext(authContext);
    // const [posts, setPosts] = useState([]);
    const uid:string = auth?.currentUser?.uid!;
    const postsQuery = query(
        collection(firestore, "users", uid, "posts"), 
        // where('published','==', true),
        orderBy('createdAt','desc'));
    const [querySnapshot] = useCollection(postsQuery);
    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
          <h1>Manage your Posts</h1>
          <PostFeed posts={posts} admin />
        </>
      );
}

function CreateNewPost () {
    const router = useRouter();
    const { username } = useContext(authContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabCase(title));

    // Validate length
    const isValid = title.length > 3 && title.length < 100;

    // Create a new post in firestore
    const createPost = async (e:any) => {
        e.preventDefault();
        const auth = getAuth();
        const uid:string = auth?.currentUser?.uid!;
        await setDoc(doc(firestore, "users", uid, "posts", slug), {
            // Tip: give all fields a default value here
            title,
            slug,
            uid,
            username,
            published: false,
            content,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,

        })

        toast.success('Post created!')

        // Imperative navigation after doc is set
        router.push(`/admin/${slug}`);

    };

    return (
        <form onSubmit={createPost}>
        <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Article!"
            // className={styles.input}
        />
        <br></br>
        <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Here's my content"
            // className={styles.input}
        />
        <p>
            <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
            Create New Post
        </button>
        </form>
    );
}
