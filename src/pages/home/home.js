import { useState , useEffect } from 'react';
import { useLocation } from 'react-router'
import './home.css';
import Header from '../../components/header/header.js';
import Posts from '../../components/posts/posts';
import SideBar from '../../components/sideBar/sideBar';
import axios from 'axios';

export default function Home() {
    const {search} = useLocation();
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async ()=>{
            const res = await axios.get("/posts"+search)
            console.log(res.data)
            setPosts(res.data);
        }
        fetchPosts();
    }, [search])

    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <SideBar/>
            </div>
        </>
    )
}
