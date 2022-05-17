import MemberFeed from "../../../../components/members/MemberFeed";
import { useRouter } from "next/router";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { firestore, storage, memberToJSON } from '../../../../lib/firebaseConfig/init';
import { useDocumentData } from "react-firebase-hooks/firestore";
import { communityToJSON } from "../../../../lib/firebaseConfig/init";
import Link from "next/dist/client/link";
import { useContext, useState, useEffect} from 'react';
import { authContext } from '../../../../lib/authContext'
import { getUserWithUsername } from "../../../../lib/firebaseConfig/init";

export async function getStaticProps(context:any)  {
    const {params} = context;
    const {slug} = params;
    const realSlug:string = Array.isArray(slug)?slug[0]:slug!;
    const communityQuery= query(collection(firestore, "communities", slug, "members"));
    const membersSnapshot = await getDocs(communityQuery);
    const members = membersSnapshot.docs.map(d => d.id);
    const membersQuery = query(collection(firestore, "users"), where("uid", "in", members))
    const membersInfo = (await getDocs(membersQuery)).docs.map(memberToJSON);
    // console.log("slug" + realSlug)
    return{
        props: {membersInfo, realSlug},
        revalidate: 5000,
    };

}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collection(firestore, 'communities'));
    const paths = snapshot.docs.map((doc) => {
        const { slug } = doc.data();
        return {
        params: {slug},
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

interface Props {
    membersInfo: any 
    realSlug: string
}

export default function Members(props: Props) {
    const realSlug = props.realSlug;
    const membersInfo = props.membersInfo;
    const { username } = useContext(authContext);
    const realUsername:string = username!;
    // console.log("username is ", realUsername)
    const [user, setUser] = useState<any>();
    const [userCommunityDoc, setUserCommunityDoc] = useState<any>()
    const [admin, setAdmin] = useState<boolean>(false);
    let newUserCommunityDoc:any = null;
    // console.log("1", newUserCommunityDoc);

    
    useEffect(() => {
        const getUser = async () => {
            // console.log("hi im lucy and im cutie ")
            const userDoc = await getUserWithUsername(realUsername);
            // console.log("USERDOC", userDoc)
            if(userDoc){
                const newUser = memberToJSON(userDoc);
                setUser(newUser);
                // console.log("USER", newUser)
                const userCommunityRef = doc(firestore, "users", newUser.uid, "communities", realSlug);
                const data = await getDoc(userCommunityRef);
                newUserCommunityDoc = communityToJSON(data);
                setUserCommunityDoc(newUserCommunityDoc);
                // console.log("3", newUserCommunityDoc);

                // console.log("USERCOMMUNITYDOC", newUserCommunityDoc)
                const realAdmin = newUserCommunityDoc.admin;
                setAdmin(realAdmin);
                // if (userCommunityDoc) {
                //     setAdmin(userCommunityDoc.admin);
                //     console.log("ADMIN", userCommunityDoc.admin)
                // }
            }
        }
        getUser();
    }, [realUsername])


    return(
        <>
       <div className="mt-10 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Members</h1>
              <p className="mt-2 text-sm text-gray-700">A list of all the members in your account including their name, title, email and role.</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              {admin && (
              <Link href={`/community/${realSlug}/addmembers`}>
              <button type="button" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add Member</button>
              </Link>
              )}
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Added By</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
       <MemberFeed members={membersInfo} slug={realSlug}/>
       </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );

}
