import { useLocation } from 'react-router';
import { useState , useEffect, useContext } from 'react';
import { Context } from '../../context/context';
import axios from 'axios';

import './singlePost.css'
import { Link } from 'react-router-dom';

export default function SinglePost({setauthor}) {
    const location = useLocation();
    const path = (location.pathname.split("/")[2]);
    
    const [post, setpost] = useState({});
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [updateMode, setupdateMode] = useState(false)
    
    const { user } = useContext(Context);
    const PF = "http://localhost:3001/images/";

    useEffect(() => {
        const getPost = async ()=>{
            const res = await axios.get(`/posts/${path}`)
            setpost(res.data);
            settitle(res.data.title);
            setdesc(res.data.desc)
        }
        getPost();
    }, [path])

    const handleDelete = async () =>{
        try{
            const res = await axios.delete(`/posts/${path}`,{
                data: {username: user.username}
            });
            res && window.location.replace("/");
        } catch(err){
            console.log(err);
        }
    }
    
    const handleUpdate = async () => {
        try{
            const res = await axios.put(`/posts/${path}`,{
                username: user.username,
                title, 
                desc
            });
            res && setupdateMode(false);
        } catch(err){
            console.log(err);
        }
    }

    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    
    return (
        <div className="singlePost">
            {post.photo &&(
                <div className="singlePostWrapper">
                    <img className="singlePostImg" src={PF + post.photo} alt="SnowHill"/>
                </div>
            )}{
                updateMode? (
                <div className="singlePostTitle">
                    <input type="text" defaultValue={title} className="singlePostEditTitle" onChange={(e)=>{settitle(e.target.value)}}/>
                    {post.username === user?.username && 
                        <div className="singlePostEdit">
                            <i className="singlePostIcon singlePostIconBig fas fa-check" onClick={handleUpdate}></i>
                            <i className="singlePostIcon singlePostIconBig fas fa-times" onClick={()=>setupdateMode(false)}></i>       
                        </div>
                    }
                </div>       
                ):(
                    <h1 className="singlePostTitle">{title} 
                        {post.username === user?.username && 
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit"onClick={()=>setupdateMode(true)}></i>
                                <i className="singlePostIcon fas fa-trash-alt" onClick={handleDelete}></i>       
                            </div>
                        }
                    </h1>
                )
            }
            <div className="singlePostInfo">
                <span className="singlePostAuthor">{`Author: `}
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                </span>
                <span className="singlePostDate">{`Updated ${timeSince(new Date(post.updatedAt).getTime())} ago`}</span>
            </div>
            {
                updateMode? 
                <textarea className="singlePostEditDesc" type="text" defaultValue={desc} onChange={(e)=>{setdesc(e.target.value)}}></textarea>
                :(
                    <p className="singlePostDescription">{desc}</p>
                )
            }
        </div>
    )
}
