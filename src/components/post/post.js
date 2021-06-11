import {Link} from 'react-router-dom';
import './post.css';

export default function Post({post}) {
    console.log(post.categories)
    const PF = "http://localhost:3001/images/";
    return (
        <div className="post">
            {post.photo && (
                <img className="postImg" src={PF+ post.photo} alt="postimage"/>
            )}
            <div className="postInfo">
                <div className="postHeader">
                    <Link to={`/post/${post._id}`} className="link">
                        <span className="postTitle">
                            {post.title} 
                        </span>
                    </Link>
                    <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <div className="postCats">
                    {
                        post.categories.map((cat, i)=>{
                            return(
                                <Link to={`/?cat=${cat}`} className="link" key={i}>
                                    <span key={i} className="postCat">{cat}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                {/* <hr/> */}
                <p className="postDescription">{post.desc}</p>
            </div>
        </div>
        // <div className="post">
        //     {post.photo && (
        //         <img className="postImg" src={PF+ post.photo} alt="postimage"/>
        //     )}
        //     <div className="postInfo">
        //         <div className="postCats">
        //             {
        //                 post.categories.map((cat)=><span className="postCat">{cat.name}</span>
        //                 )
        //             }
        //         </div>
        //         <Link to={`/post/${post._id}`} className="link">
        //             <span className="postTitle">
        //                 {post.title} 
        //             </span>
        //         </Link>
        //         <hr/>
        //         <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        //     </div>
        //     <p className="postDescription">{post.desc}</p>
        // </div>
    )
}
