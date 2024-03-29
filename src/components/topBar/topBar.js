// import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/context';
import './topBar.css';

export default function TopBar() {
    const { dispatch, user } = useContext(Context);

    const handleLogout = ()=>{
        dispatch({type: "LOGOUT"})
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i> 
                <i className="topIcon fab fa-instagram-square"></i>  
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/about" className="link">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className="link">WRITE</Link></li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>

                </ul>
            </div>
            <div className="topRight">
                {
                    user? (
                        <Link to="/settings">
                            <img className="topImage" src={user.profilePicture ||"http://cdn.onlinewebfonts.com/svg/img_87237.png"} alt="profile"/>
                            {/* <img className="topImage" src="http://cdn.onlinewebfonts.com/svg/img_87237.png" alt="profile"/> */}
                        </Link>
                    ): (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link to="/login" className="link">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/register" className="link">REGISTER</Link>
                            </li>
                        </ul>
                    )

                }
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    )
}
