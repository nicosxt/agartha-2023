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
        <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>

      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer>

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
    </div>
    );

}