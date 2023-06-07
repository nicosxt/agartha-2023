import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

interface Props {
  posts: any;
}

export default function Home(props: Props): any {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const [isHovering, setIsHovered] = useState(false);

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <main className=" min-h-screen  relative bg-white">
        <div className="relative">
          <img className="w-full" src="/about.jpg" alt="" />
          <a
            style={{ cursor: "pointer" }}
            target="_blank"
            rel="noreferrer"
            href="https://www.notion.so/Mission-Paper-ec7cd6959bce4437ad0a3417bf01ef6b"
          >
            <img
              src="/buttons/readManifesto.png"
              className="h-10 lg:h-16 mt-4 sm:h-14 md:h-20 md:mt-16 lg:mt-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2/4 "
            />
          </a>
        </div>
        <img src="/about-2.jpg" className="" />
      </main>
    </>
  );
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//       <FrontPage>{page}</FrontPage>
//       // <Layout>{page}</Layout>

//   )
// }
