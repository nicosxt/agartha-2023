import { setDoc, doc } from "firebase/firestore";
import { firestore, storage } from "../../lib/firebaseConfig/init";

import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Props {
  url: string;
  urls: string[];
  slug: any;
  uid: any;
}

// UI component for main post content
export default function ImageUrl(prop: Props) {
  const url = prop.url;
  const slug = prop.slug;
  const urls = prop.urls;
  const uid = prop.uid;
  const shortName = url.substring(url.lastIndexOf("=") + 1);

  return (
    <>
      <div className="sm:col-span-2">
        {/* <dt class="text-sm font-medium text-gray-500">Attachments</dt> */}
        <dd className="mt-1 text-sm text-gray-900">
          <ul
            role="list"
            className="border border-gray-200 rounded-md divide-y divide-gray-200"
          >
            <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
              <div className="w-0 flex-1 flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 flex-1 w-0 truncate"> {shortName} </span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <a
                  href={url}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {" "}
                  View{" "}
                </a>
                <DeleteImageButton
                  url={url}
                  urls={urls}
                  slug={slug}
                  uid={uid}
                />
                {/* <a href={url} className="font-medium text-red-600 hover:text-red-500"> Delete </a> */}
              </div>
            </li>
          </ul>
        </dd>
      </div>
    </>
  );
}

function DeleteImageButton(props: any): any {
  const { url, slug, urls, uid } = props;
  const deleteImage = () => {
    const index = urls.indexOf(url);
    if (index > -1) {
      urls.splice(index, 1);
    }
    setDoc(
      doc(firestore, "users", uid, "posts", slug),
      {
        images: urls,
      },
      { merge: true }
    );
  };

  return (
    <button
      type="button"
      onClick={deleteImage}
      className="font-medium text-red-600 hover:text-red-500"
    >
      {" "}
      Delete{" "}
    </button>
  );
}
