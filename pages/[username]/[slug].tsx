import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import {firestore} from '../../lib/firebaseConfig/init';
import PostContent from '../../components/users/PostContent'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import DisplayForm from '../../components/form/DisplayForm';



export async function getStaticProps(context:any) {
    const {params} = context;
    const { username, slug } = params;
    
    
    const userDoc = await getUserWithUsername(username);
    console.log(username)
    let post;
    let path;

    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    if (userDoc) {
        const userUid = userDoc.data().uid;
        const postRef = doc(firestore, "users", userUid, "posts", slug);
        post = postToJSON(await getDoc(postRef));
        path = postRef.path;
    }
  
    return {
      props: { post, path },
      revalidate: 5000,
    };
  }

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    console.log("heaosfhaoif")
    const snapshot = await getDocs(collectionGroup(firestore, 'posts'));
    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        console.log(username)
        console.log(slug)
        return {
        params: { username, slug},
        };
    });

    return {
        // must be in this format:
        // paths: [
        //   { params: { username, slug }}
        // ],
        paths,
        fallback: 'blocking',
    };
}

export default function Post(props:any) {

    const postRef = doc(firestore, props.path);
    const [realtimePost] = useDocumentData(postRef);
    const post = realtimePost || props.post;

    return (
        <main>
            <DisplayForm post={post}/>
             {/* <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                <strong>{post.heartCount || 0} 🤍</strong>
                </p>

            </aside> */}

        </main>
    );
}