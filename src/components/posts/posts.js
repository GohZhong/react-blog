import Post from '../post/post';
import './posts.css';

export default function Posts({posts}) {
    return (
        <div className="posts">
            {
                posts.map((post, i)=><Post post={post} key={i}/>)
            }
        </div>
    )
}
