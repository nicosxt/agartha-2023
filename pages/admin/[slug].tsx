import styles from '../../style/Admin.module.css';
import AuthCheck from "../../components/misc/authcheck";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getAuth,onAuthStateChanged, signOut as signout } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { firestore } from '../../lib/firebaseConfig/init'
import Link from 'next/link'
import { connectStorageEmulator } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import { updateDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';


export default function AdminPostEdit(props:any) {
    return (
      <AuthCheck>
          <PostManager />
      </AuthCheck>
    );
  }
  
function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
  const auth = getAuth();

  const uid:string = auth?.currentUser?.uid!;

  const postRef = doc(firestore, "users", uid, "posts", realSlug);    
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>

          <aside>
          <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

interface Props {
  defaultValues: any,
  postRef: any,
  preview: any
}
function PostForm(props:Props) {
  const {defaultValues, postRef, preview} =props;
  const { register, handleSubmit, reset, watch, formState, setError } = useForm({ defaultValues, mode: 'onChange' });
  const { isValid, isDirty } = formState;
  
  // console.log("signal")
  // console.log(postRef)
  

  const updatePost = async (data:any) => {
    const {content, published} = data;
    console.log("signal")
    console.log(content)
    console.log(published)
    await updateDoc(postRef, {
      // published: true,
      // content: "how about this "
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!')
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>

        <textarea {...register("content")}></textarea>

        <fieldset>
          <input className={styles.checkbox} type="checkbox" {...register("published")} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  );
}