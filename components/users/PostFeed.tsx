import Link from 'next/link';
import { Container } from '@mui/material'


interface Props {
    posts: any
    admin: boolean
}

export default function PostFeed(props: Props): any {
    const {posts, admin} = props;
    return posts ? posts.map((post:any) =><PostItem post={post} key={post.slug} admin={admin} />) : null;
}

interface PostProps{
    post: any
    admin: boolean
}


function PostItem(props: PostProps) : any {
    const post = props.post;
    const admin = props.admin;
    
    const wordCount = post?.content.toString().trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);
    
    return (
      <a href={`/${post.username}/${post.slug}`} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

      <Link href={`/${post.username}/${post.slug}`}>
        <a>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
        </a>
      </Link>

      <Link href={`/${post.username}`}>
        <a>
          <i>By @{post.username}</i>
        </a>
      </Link>

      {/* <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer> */}

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </a>
    );


}