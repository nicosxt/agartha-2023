import { doc, updateDoc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../../lib/firebaseConfig/init";
import { getAuth } from "firebase/auth";
export default function HeartButton(props: any) {
  const { postRef } = props;
  const path = postRef.path;
  const hearRef = doc(firestore, path, "hearts");
  const [heartDoc] = useDocument(hearRef);

  const addHeart = async () => {
    const batch = writeBatch(firestore);
    const uid = getAuth()?.currentUser?.uid!;
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(hearRef, { uid }, { merge: true });
    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(hearRef);
    await batch.commit();
  };
  return heartDoc?.exists ? (
    <button onClick={removeHeart}> 💔 Unheart </button>
  ) : (
    <button onClick={addHeart}> 💗 Heart </button>
  );
}

// const heartRef = doc(firestore,)
//give me a code example to get the sub collections of a document in firebase v9
