import './sideBar.css'
import { useState , useEffect, useContext } from 'react';
import { Context } from '../../context/context'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function SideBar() {
    const { user } = useContext(Context);
    const [cats, setcats] = useState([]);
    const location = useLocation();
    const path = (location.pathname.split("/")[2]);
    const [author, setauthor] = useState({});
    
    useEffect(() => {
        const getAuthorAndCats = async ()=>{
            if(path){
                const res = await axios.get(`/posts/${path}`)
                const authorname = res.data.username;
                const authors = await axios.get(`/users/author/${authorname}`)
                setauthor(authors.data);
            } else if(user){
                setauthor(user);
            }
            const cats = await axios.get('/categories');
            setcats(cats.data);
        }
        getAuthorAndCats();
    }, [path, user])
    console.log(author.about)

    return (
        <div className="sideBar">
            <div className="sideBarItem">
                <span className="sideBarAuthor">{author.username}</span>
                {
                    author.profilePicture && (<img className="sideBarImg" src={author.profilePicture} alt="Me"/>)
                }
                <span className="sideBarTitle">ABOUT ME</span>
                <p style={{'maxWidth':'200px','whiteSpace': 'pre-line','wordWrap':'break-word'}}>{author.about||'~'}</p>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">CATEGORIES</span>
                <ul className="sideBarList">
                    {
                        cats.map((cat,i)=>{
                            return(
                                <Link to={`/?cat=${cat.name}`} className="link" key={i}>
                                    <li className="sideBarListItem">{cat.name}</li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="sideBarItem">
                <span className="sideBarTitle">FOLLOW ME</span>
                <div className="sideBarSocial">
                    <a className="sideBarLink" href={author?.contact?.fb}>
                        <i className="sideBarIcon fab fa-facebook-square"/>
                    </a>
                    <a className="sideBarLink" href={author?.contact?.tw}>
                        <i className="sideBarIcon fab fa-twitter-square"></i>
                    </a>
                    <a className="sideBarLink" href={author?.contact?.insta}> 
                        <i className="sideBarIcon fab fa-instagram-square"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}
