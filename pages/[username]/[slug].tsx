import { getUserWithUsername, postToJSON } from '../../lib/firebaseConfig/init';
import { query, doc, getDoc, collection, getDocs, where, collectionGroup} from 'firebase/firestore';
import {firestore} from '../../lib/firebaseConfig/init';
import PostContent from '../../components/users/PostContent'
import { useDocumentData } from 'react-firebase-hooks/firestore';


export async function getStaticProps(context:any) {
    const {params} = context;
    const { username, slug } = params;
    // console.log("------------")
    // console.log(username, slug)
    // username = "asimova"
    // console.log("here?")
    const userDoc = await getUserWithUsername(username);
  
    let post;
    let path;
    //using slug of the post as the id to get the post 

    // console.log('im here')
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    if (userDoc) {
        const userUid = userDoc.data().uid;
        // console.log(userUid)
        // console.log(userDoc.data())
        // slug = "etetuosetoseht"
        // console.log('im here')
        // console.log(username, slug)

        const postRef = doc(firestore, "users", userUid, "posts", slug);
        post = postToJSON(await getDoc(postRef));
        path = postRef.path;
    }
    // console.log("how about here?")
    // console.log(post)
    // console.log(path)
  
    return {
      props: { post, path },
      revalidate: 5000,
    };
  }

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    // console.log("maybe this?")
    const snapshot = await getDocs(collectionGroup(firestore, 'posts'));
    // console.log('jo')
    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
        params: { username, slug },
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
// interface PostProps{
//     props: any
// }

export default function Post(props:any) {

    const postRef = doc(firestore, props.path);
    const [realtimePost] = useDocumentData(postRef);
    const post = realtimePost || props.post;

    return (
        <main>
             <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                <strong>{post.heartCount || 0} 🤍</strong>
                </p>

            </aside>

        </main>
    );
}