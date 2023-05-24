import { authContext } from "../../lib/authContext";
import { useContext, useState } from "react";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { getAuth, onAuthStateChanged, signOut as signout } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { firestore, memberToJSON } from "../../lib/firebaseConfig/init";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import React, { useEffect, useCallback } from "react";
import { getUserWithUsername } from "../../lib/firebaseConfig/init";
import Link from "next/dist/client/link";
export default function JoinCommunityForm(props: any) {
  const [formValue, setFormValue] = useState(""); //user enter name
  // Set values
  // const [member, setMember] = useState('');
  //get members
  const { username } = useContext(authContext);
  const [reference, setReference] = useState("");
  const [reason, setReason] = useState("");

  const [member, setMember] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(" ");
  const [user, setUser] = useState();
  // console.log("1", isValid);
  let info = "n/a";

  //use effect get uid by username
  //useEffect with async function

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserWithUsername(formValue);
      if (user) {
        info = memberToJSON(user).uid;
        // console.log("info", info);
        setUid(info);
        if (info) {
          const docRef = doc(firestore, "communities", slug, "members", info);
          const docSnap = await getDoc(docRef);
          const exists = docSnap.exists();
          // console.log("uid", uid);
          setIsValid(exists);
          setReference(formValue);
          // console.log("hhhh", isValid);
        }
      } else {
        setUid(" ");
        setIsValid(false);
      }
    };
    getUser();
  }, [formValue]);
  // console.log("formValue", formValue)

  const onChange = (e: React.ChangeEvent<any>) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
      // console.log("5", isValid);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
      // console.log("6", isValid);
    }
  };

  const router = useRouter();

  const { slug } = props;
  let realUsername: string = username!;

  const joinCommunity = async (e: any) => {
    e.preventDefault();
    const user = await getUserWithUsername(realUsername);
    const ref = doc(
      firestore,
      "communities",
      slug,
      "requests",
      user.data().uid
    );
    const communityRef = doc(firestore, "communities", slug);
    const communityDoc = await getDoc(communityRef);
    const communityName = communityDoc.data()?.communityName;

    await setDoc(
      ref,
      {
        username: user.data().username,
        uid: user.data().uid,
        reference: reference,
        reason: reason,
        slug: slug,
        communityName: communityName,
      },
      { merge: true }
    );
    router.push(`/${username}/community/${slug}/members`);
  };

  return (
    <>
      <form
        className="py-10 space-y-8 divide-y divide-gray-200"
        onSubmit={joinCommunity}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-8">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Join Community 📝
              </h3>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {" "}
                Username{" "}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  value={realUsername ? realUsername : "N/A"}
                  readOnly={true}
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="bg-slate-300 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-500">
                  This is a readonly field showing your username.
                </p>
              </div>
            </div>
            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5"></div>

            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Please enter the <strong>username </strong>who referenced you
                  to this community, if no one referenced you, please leave a
                  blank.
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={formValue}
                    // onChange={(e) => setReference(e.target.value)}
                    onChange={onChange}
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  <UsernameMessage
                    username={formValue}
                    isValid={isValid}
                    loading={loading}
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {" "}
                  Reason for joining?{" "}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link href={`/${username}/community/${slug}/members`}>
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

interface Props {
  username: string;
  isValid: boolean;
  loading: any;
}

function UsernameMessage(props: Props): any {
  const { loading, isValid, username } = props;
  // console.log("hum", isValid);

  if (loading) {
    return <p>Checking...</p>;
  } else if (!isValid && username.length > 0) {
    //if member does not exist
    return (
      <Text color="tomato">{username} does not exist in this community!</Text>
    );
  } else if (username.length <= 3 && username.length > 0) {
    return <Text color="tomato">{username} is too short!</Text>;
  } else if (username && isValid) {
    return <Text color="green">{username} exists in this community!</Text>;
  } else {
    return <p></p>;
  }
}
